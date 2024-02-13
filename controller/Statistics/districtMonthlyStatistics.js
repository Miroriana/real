const VeterinaryModel = require("../../models/admin.model");
const MilkModel = require("../../models/milkProduction.model");
const { catchAsyncError } = require("../../utility/catchSync");
const { errorHandler } = require("../../utility/errorHandlerClass");

const DistrictMonthlyQuantity = catchAsyncError(async (req, res, next) => {
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
  const twelveMonthsAgo = new Date(currentDate);
  twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

  try {
    const milkProductions = await MilkModel.find({
      district: veterinaryDistrict,
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

    let monthlyQuantitiesMap = new Map();

    milkProductions.forEach((production) => {
      const monthName = production.createdAt.toLocaleDateString("en-US", {
        month: "long",
      });
      const quantity = production.quantity;
      const sector = production.sector;

      if (!monthlyQuantitiesMap.has(sector)) {
        monthlyQuantitiesMap.set(sector, { sector, quantities: new Map() });
      }

      const sectorQuantities = monthlyQuantitiesMap.get(sector).quantities;

      if (sectorQuantities.has(monthName)) {
        sectorQuantities.set(
          monthName,
          sectorQuantities.get(monthName) + quantity
        );
      } else {
        sectorQuantities.set(monthName, quantity);
      }
    });

    // Convert Map to Array
    const monthlyQuantities = Array.from(
      monthlyQuantitiesMap.values(),
      (value) => {
        return {
          ...value,
          quantities: Array.from(value.quantities, ([monthName, quantity]) => ({
            monthName,
            quantity,
          })),
        };
      }
    );

    res.status(200).json({
      Province: veterinaryProvince,
      District: veterinaryDistrict,
      monthlyQuantities,
    });
  } catch (error) {
    next(new errorHandler(500, `Internal Server Error: ${error.message}`));
  }
});

module.exports = { DistrictMonthlyQuantity };
