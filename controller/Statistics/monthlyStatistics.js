const MilkModel = require("../../models/milkProduction.model");
const { catchAsyncError } = require("../../utility/catchSync");
const { errorHandler } = require("../../utility/errorHandlerClass");

const ADMIN_ROLE = "admin";

const monthlyQuantity = catchAsyncError(async (req, res, next) => {
  const requestingUser = req.user;

  if (requestingUser.role !== ADMIN_ROLE) {
    return next(
      new errorHandler(400, `Access Denied. You are not authorized.`)
    );
  }

  const currentDate = new Date();
  const twelveMonthsAgo = new Date(currentDate);
  twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

  try {
    const milkProductions = await MilkModel.find({
      createdAt: { $gte: twelveMonthsAgo, $lt: currentDate },
    });

    if (milkProductions.length === 0) {
      return next(
        new errorHandler(
          400,
          `There are no milk records available in the last twelve months.`
        )
      );
    }

    const provinceQuantitiesMap = new Map();

    milkProductions.forEach((production) => {
      const province = production.province;
      const monthName = production.createdAt.toLocaleDateString("en-US", {
        month: "long",
      });
      const quantity = production.quantity;

      if (!provinceQuantitiesMap.has(province)) {
        provinceQuantitiesMap.set(province, {
          quantity: 0,
          monthlyQuantities: {},
        });
      }

      const provinceData = provinceQuantitiesMap.get(province);
      provinceData.quantity += quantity;

      if (!provinceData.monthlyQuantities[monthName]) {
        provinceData.monthlyQuantities[monthName] = 0;
      }

      provinceData.monthlyQuantities[monthName] += quantity;
    });

    const provinceQuantities = Array.from(
      provinceQuantitiesMap,
      ([province, data]) => ({
        province,
        quantity: data.quantity,
        monthlyQuantities: Object.entries(data.monthlyQuantities).map(
          ([month, quantity]) => ({ month, quantity })
        ),
      })
    );

    const formattedStartDate = twelveMonthsAgo.toLocaleDateString("en-US");
    const formattedEndDate = currentDate.toLocaleDateString("en-US");

    res.status(200).json({
      totalQuantity: milkProductions.reduce(
        (acc, production) => acc + production.quantity,
        0
      ),
      provinceQuantities,
      dateRange: `${formattedStartDate} to ${formattedEndDate}`,
    });
  } catch (error) {
    return next(
      new errorHandler(500, `Internal Server Error: ${error.message}`)
    );
  }
});

module.exports = { monthlyQuantity };
