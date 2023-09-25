const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const connectDb = require("./connection/connection");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const { verifyJwt } = require("./middlewares/verifyJWT");
const cookieParser = require("cookie-parser");
connectDb();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", userRoutes);
app.use(verifyJwt);
app.get("/", async (req, res) => {
  res.json("hello");
});
app.listen(PORT, () => {
  console.log(`server is listen on http://localhost:${PORT}`);
});
