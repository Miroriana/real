const { Schema, model } = require("mongoose");
//milk production model
const milkSchema = new Schema(
  {
    farmerId: {
      type: Schema.Types.ObjectId,
      ref: "farmer",
      required: false,
    },
    mccId: {
      type: Schema.Types.ObjectId,
      ref: "mcc",
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
      unique: false,
    },
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    veterinaryId: {
      type: String,
      required: true,
    },
    mccId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const MilkModel = model("milk", milkSchema);
module.exports = MilkModel;
