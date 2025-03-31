const express = require("express");
const {
  addAddress,
  getAddress,
  deleteAddress,
  updateAddress,
} = require("../controller/AddressController");

const router = express.Router();

router.post("/add-address", addAddress);
router.get("/get-address", getAddress);
router.delete("/delete-address", deleteAddress);
router.put("/update-address", updateAddress);

module.exports = router;
