const express = require("express");
const router = express.Router();
const { verifyJwt } = require("../middlewares/verifyJWT");
const {
  homePage,
  crmUserRegister,
  crmUserLogin,
} = require("../controllers/userController");
router.get("/", verifyJwt, homePage);
router.post("/crmuserregister", crmUserRegister);
router.post("/crmuserlogin", crmUserLogin);
module.exports = router;
