const VeterinaryModel = require("../../models/admin.model");
const MilkModel = require("../../models/milkProduction.model");
const MccModel = require("../../models/veterian.model");
const { catchAsyncError } = require("../../utility/catchSync");
const { errorHandler } = require("../../utility/errorHandlerClass");

const SectorDailyQuantity = catchAsyncError(async (req, res, next) => {
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
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  try {
    const milkProductions = await MilkModel.find({
      sector: mccSector,
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

    let dailyQuantitiesMap = new Map();

    milkProductions.forEach((production) => {
      const dayName = production.createdAt.toLocaleDateString("en-US", {
        month: "long",
      });
      const quantity = production.quantity;

      if (!dailyQuantitiesMap.has(dayName)) {
        dailyQuantitiesMap.set(dayName, { quantity, dayName });
      } else {
        dailyQuantitiesMap.get(dayName).quantity += quantity;
      }
    });

    const dailyQuantities = Array.from(
      dailyQuantitiesMap.values(),
      (value) => ({
        dayName: value.dayName,
        quantity: value.quantity,
      })
    );

    res.status(200).json({
      Province: mccProvince,
      District: mccDistrict,
      Sector: mccSector,
      dailyQuantities,
    });
  } catch (error) {
    next(new errorHandler(500, `Internal Server Error: ${error.message}`));
  }
});

module.exports = { SectorDailyQuantity };
