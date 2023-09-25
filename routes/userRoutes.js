const express = require("express");
const router = express.Router();
const { verifyJwt } = require("../middlewares/verifyJWT");
const {
  homePage,
  crmUserRegister,
  crmUserLogin,
} = require("../controllers/userController");
const { handelRefereshToken } = require("../controllers/refereshToken");
// router.get("/", verifyJwt, homePage);
router.post("/crmuserregister", crmUserRegister);
router.post("/crmuserlogin", crmUserLogin);
router.get("/refreshtoken", handelRefereshToken);
router.get("/");
module.exports = router;
