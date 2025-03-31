const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
