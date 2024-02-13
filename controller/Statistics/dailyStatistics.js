const MilkModel = require("../../models/milkProduction.model");
const { catchAsyncError } = require("../../utility/catchSync");
const { errorHandler } = require("../../utility/errorHandlerClass");

const ADMIN_ROLE = "admin";

const DailyQuantity = catchAsyncError(async (req, res, next) => {
  const requestingUser = req.user;

  if (requestingUser.role !== ADMIN_ROLE) {
    return next(
      new errorHandler(400, `Access Denied. You are not authorized.`)
    );
  }

  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  try {
    const milkProductions = await MilkModel.find({
      createdAt: { $gte: sevenDaysAgo, $lt: currentDate },
    });

    if (milkProductions.length === 0) {
      return next(
        new errorHandler(
          400,
          `There are no milk records available in the last seven days.`
        )
      );
    }

    const provinceQuantitiesMap = new Map();

    milkProductions.forEach((production) => {
      const province = production.province;
      const dayName = production.createdAt.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const quantity = production.quantity;

      if (!provinceQuantitiesMap.has(province)) {
        provinceQuantitiesMap.set(province, {
          quantity: 0,
          dailyQuantities: [],
        });
      }

      const provinceData = provinceQuantitiesMap.get(province);
      provinceData.quantity += quantity;

      const existingDay = provinceData.dailyQuantities.find(
        (day) => day.day === dayName
      );

      if (existingDay) {
        existingDay.quantity += quantity;
      } else {
        provinceData.dailyQuantities.push({ day: dayName, quantity });
      }
    });

    const provinceQuantities = Array.from(
      provinceQuantitiesMap,
      ([province, data]) => ({
        province,
        quantity: data.quantity,
        dailyQuantities: data.dailyQuantities,
      })
    );

    const formattedStartDate = sevenDaysAgo.toLocaleDateString("en-US");
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

module.exports = { DailyQuantity };
