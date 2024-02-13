const { Schema, model } = require("mongoose");
const mccSchema = new Schema({
  mccName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  nationalId: {
    type: Number,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  veterinaryId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: false,
  },
  district: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "mcc",
  },
});
const MccModel = model("mcc", mccSchema);
module.exports = MccModel;
