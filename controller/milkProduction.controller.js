const milkProductionModel = require("../models/milkProduction.model");
const MilkModel = require("../models/milkProduction.model");
const { errorHandler } = require("../utility/errorHandlerClass");
const FarmerModel = require("../models/farmer.model");
const { catchAsyncError } = require("../utility/catchSync");
const MccUserModel = require("../models/mccUser.model");
const MccModel = require("../models/veterian.model");

// Add milk production record
//const addmilkProduction = async (req, res, next) => {
//const {id, ...rest} = req.body;
//try {
//   var milkPExists = await farmerModel.findOne({ _id: req.body.id});
//   if (milkPExists){
//     return res
//       .status(200)
//       .json({ message: "MilkProduction with this name already exists" });
//   }
//   else {
//     var addedMilkProduction = await milkProductionModel.create(req.body);
//     res.status(201).json({
//       message: "MilkProduction is recorded successfully",
//       addedMilkProduction
//     });
//   }
//   await farmerModel.findByIdAndUpdate({_id:milkPExists.id},{quantity:addedMilkProduction} )
//   next();
// } catch (error){
//   console.error(error);
//   res.status(500).send('internal Server Error');
// }};
const addmilkProduction = catchAsyncError(async (req, res, next) => {
  const mccEmail = req.user.email;

  const mcc = await MccModel.findOne({
    email: mccEmail,
  });

  if (!mcc) {
    return next(
      new errorHandler(400, `Access Denied. You are not authorized.`)
    );
  }

  const farmer = await FarmerModel.findOne({
    email: req.body.email,
  });

  if (!farmer) {
    return next(
      new errorHandler(
        400,
        `farmer with this email:${req.body.email} not found.`
      )
    );
  }
  req.body.farmerName = farmer.farmerName;
  req.body.farmerId = farmer._id;
  req.body.veterinaryId = farmer.veterinaryId;
  req.body.mccId = farmer.mccId;
  req.body.province = farmer.province;
  req.body.district = farmer.district;
  req.body.sector = farmer.sector;

  const milkProducts = await milkProductionModel.create({
    farmerId: farmer._id,
    farmerName: farmer.farmerName,
    veterinaryId: farmer.veterinaryId,
    mccId: mcc._id,
    quantity: req.body.quantity,
    province: mcc.province,
    district: mcc.district,
    sector: mcc.sector,
  });

  farmer.currentQuantity = req.body.quantity;
  farmer.quantity = farmer.quantity + req.body.quantity;
  await farmer.save();

  res.status(201).json({
    message: "Milk  recorded successfully",
    milkProducts,
    farmer: farmer,
  });
});

const addedMilkProduction = async (req, res, next) => {
  try {
    var addedQuantity = await MilkModel.create(req.body);
    res.status(201).json({
      message: "Milk was recorded successfully",
      addedQuantity,
    });
  } catch (error) {
    next(new errorHandler(400, error.message));
  }
};

// removing a recorded farmer
const removemilkProduction = async (req, res, next) => {
  try {
    var deletedmilkProduction = await milkProductionModel.findByIdAndDelete(
      req.query.id
    );
    if (deletedmilkProduction) {
      res.status(200).json({
        message: "milkProduction is Deleted",
      });
    } else {
      res.status(404).send("milkProduction not found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//finding the farmer by id
const findmilkProductionById = async (req, res, next) => {
  var milkProductionTBF = await milkProductionModel.findById(req.query.id);
  try {
    if (milkProductionTBF === null) {
      res.json({ message: "the milkProduction was deleted" });
    }
    res.json({
      message: "milkProduction is found",
      milkProductionTBF,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
//listing or the farmers recorded
const listOfmilkProduction = async (req, res, next) => {
  var milkProduction = await milkProductionModel.find();
  var farmerProduction = await farmersProductionModel.find();
  try {
    res.json({
      message: "this is the milkProduction list",
      milkProduction,
      farmerProduction,
    });
  } catch (error) {
    res.status(500).send("you don't have any milkProduction in the list");
  }
};
//updating a farmer's information according to his email
const updatemilkProduction = async (req, res, next) => {
  try {
    var updatedmilkProduction = await FarmerModel.findOneAndUpdate(
      { _id: req.query.id },
      req.body
    );
    var farmer = await milkProductionModel.find(updatedmilkProduction._id);
    res.status(200).json({
      message: "The updated milkProductio became",
      farmer,
    });
  } catch (error) {
    res.status(500).send("can't be deleted");
  }
};

module.exports = {
  listOfmilkProduction,
  findmilkProductionById,
  removemilkProduction,
  addmilkProduction,
  updatemilkProduction,
  addedMilkProduction,
};
