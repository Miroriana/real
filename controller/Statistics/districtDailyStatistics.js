const VeterinaryModel = require("../../models/admin.model");
const MilkModel = require("../../models/milkProduction.model");
const { catchAsyncError } = require("../../utility/catchSync");
const { errorHandler } = require("../../utility/errorHandlerClass");

const DistrictDailyQuantity = catchAsyncError(async (req, res, next) => {
  const veterinaryEmail = req.user.email;

  const veterinary = await VeterinaryModel.findOne({
    email: veterinaryEmail,
  });

  if (!veterinary) {
    return next(
      new errorHandler(400, `Access Denied. You are not authorized.`)
    );
  }

  const veterinaryProvince = veterinary.province;
  const veterinaryDistrict = veterinary.district;

  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  try {
    const milkProductions = await MilkModel.find({
      district: veterinaryDistrict,
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
      const sector = production.sector;

      const key = `${dayName}-${sector}`;

      if (dailyQuantitiesMap.has(key)) {
        dailyQuantitiesMap.set(key, dailyQuantitiesMap.get(key) + quantity);
      } else {
        dailyQuantitiesMap.set(key, quantity);
      }
    });

    const dailyQuantities = Array.from(
      dailyQuantitiesMap,
      ([key, quantity]) => {
        const [dayName, sector] = key.split("-");
        return { sector, quantity, dayName, quantity };
      }
    );

    res.status(200).json({
      Province: veterinaryProvince,
      District: veterinaryDistrict,
      dailyQuantities,
    });
  } catch (error) {
    next(new errorHandler(500, `Internal Server Error: ${error.message}`));
  }
});

module.exports = { DistrictDailyQuantity };
