const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const connectDb = require("./connection/connection");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
connectDb();
app.use(express.json());
app.use(cors());
app.use("/", userRoutes);
app.listen(PORT, () => {
  console.log(`server is listen on http://localhost:${PORT}`);
});
