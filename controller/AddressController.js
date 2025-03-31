const mongoose = require("mongoose");
const Address = require("../models/Address");

// ✅ Add Address
const addAddress = async (req, res) => {
  try {
    const { streetAddress, city, state, postalCode, country } = req.body;

    if (!streetAddress || !city || !state || !postalCode || !country) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: false });
    }

    const newAddress = new Address({
      streetAddress,
      city,
      state,
      postalCode,
      country,
    });
    await newAddress.save();

    res
      .status(201)
      .json({
        message: "Inserted successfully",
        status: true,
        data: newAddress,
      });
  } catch (error) {
    console.error("❌ Error in addAddress:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// ✅ Get All Addresses
const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find();
    res
      .status(200)
      .json({ message: "Fetched successfully", status: true, data: addresses });
  } catch (error) {
    console.error("❌ Error in getAddress:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// ✅ Delete Address
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required", status: false });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid ID format", status: false });
    }

    const deleted = await Address.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "ID not found", status: false });
    }

    res.status(200).json({ message: "Deleted successfully", status: true });
  } catch (error) {
    console.error("❌ Error in deleteAddress:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// ✅ Update Address
const updateAddress = async (req, res) => {
  try {
    const { id, ...updateFields } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required", status: false });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid ID format", status: false });
    }

    const updatedAddress = await Address.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedAddress) {
      return res.status(404).json({ message: "ID not found", status: false });
    }

    res
      .status(200)
      .json({
        message: "Updated successfully",
        status: true,
        data: updatedAddress,
      });
  } catch (error) {
    console.error("❌ Error in updateAddress:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { addAddress, getAddress, deleteAddress, updateAddress };
