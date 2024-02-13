const VeterinaryModel = require("../../models/admin.model");
const MilkModel = require("../../models/milkProduction.model");
const MccModel = require("../../models/veterian.model");
const { catchAsyncError } = require("../../utility/catchSync");
const { errorHandler } = require("../../utility/errorHandlerClass");

const SectorMonthlyQuantity = catchAsyncError(async (req, res, next) => {
  const mccEmail = req.user.email;

  const mcc = await MccModel.findOne({
    email: mccEmail,
  });

  if (!mcc) {
    return next(
      new errorHandler(400, `Access Denied. You are not authorized.`)
    );
  }

  const mccProvince = mcc.province;
  const mccDistrict = mcc.district;
  const mccSector = mcc.sector;

  const currentDate = new Date();
  const twelveMonthsAgo = new Date(currentDate);
  twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

  try {
    const milkProductions = await MilkModel.find({
      sector: mccSector,
      createdAt: { $gte: twelveMonthsAgo, $lt: currentDate },
    });

    if (milkProductions.length === 0) {
      return next(
        new errorHandler(
          400,
          `There are no milk records available in the last seven days.`
        )
      );
    }

    let monthlyQuantitiesMap = new Map();

    milkProductions.forEach((production) => {
      const monthName = production.createdAt.toLocaleDateString("en-US", {
        month: "long",
      });
      const quantity = production.quantity;

      if (!monthlyQuantitiesMap.has(monthName)) {
        monthlyQuantitiesMap.set(monthName, { quantity, monthName });
      } else {
        monthlyQuantitiesMap.get(monthName).quantity += quantity;
      }
    });

    const monthlyQuantities = Array.from(
      monthlyQuantitiesMap.values(),
      (value) => ({
        monthName: value.monthName,
        quantity: value.quantity,
      })
    );

    res.status(200).json({
      Province: mccProvince,
      District: mccDistrict,
      Sector: mccSector,
      dailyQuantities: monthlyQuantities,
    });
  } catch (error) {
    next(new errorHandler(500, `Internal Server Error: ${error.message}`));
  }
});

module.exports = { SectorMonthlyQuantity };
