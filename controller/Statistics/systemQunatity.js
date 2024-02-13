const MilkModel = require("../../models/milkProduction.model");
const { catchAsyncError } = require("../../utility/catchSync");
const { errorHandler } = require("../../utility/errorHandlerClass");

const systemQuantity = catchAsyncError(async (req, res, next) => {
  const requestingUser = req.user;

  if (requestingUser.role !== "admin") {
    return next(
      new errorHandler(400, `Access Denied. You are not authorized.`)
    );
  }

  const milkProductions = await MilkModel.find({});

  if (milkProductions.length === 0) {
    return next(new errorHandler(400, `There are no milk records available.`));
  }

  const provinces = [];
  let totalQuantity = 0;

  for (const milkProduct of milkProductions) {
    totalQuantity += milkProduct.quantity;

    const { province, district, quantity } = milkProduct;

    const existingProvince = provinces.find((item) => item.name === province);

    if (existingProvince) {
      existingProvince.totalQuantity += quantity;

      const existingDistrict = existingProvince.districts.find(
        (districtItem) => districtItem.name === district
      );

      if (existingDistrict) {
        existingDistrict.quantity += quantity;
      } else {
        existingProvince.districts.push({ name: district, quantity });
      }
    } else {
      provinces.push({
        name: province,
        totalQuantity: quantity,
        districts: [{ name: district, quantity }],
      });
    }
  }

  res.status(200).json({ totalQuantity, provinces });
});

module.exports = { systemQuantity };
