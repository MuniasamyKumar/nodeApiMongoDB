const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const addressRoutes = require("./routes/AddressRoutes");

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.use("/api/address", addressRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});
