const CRMUserModel = require("../models/CRMUser");
const jwt = require("jsonwebtoken");
const homePage = async (req, res) => {
  res.json("hello");
};
const crmUserRegister = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const checkEmail = await CRMUserModel.findOne({ email: email });
    if (checkEmail) {
      res
        .status(200)
        .send({ baseResponse: { status: 0, msg: "Email Already Exist" } });
    } else {
      if (name && email && password) {
        const doc = new CRMUserModel({
          name: name,
          email: email,
          password: password,
        });
        await doc.save();
        res.status(200).send({
          baseResponse: {
            status: 1,
            msg: "User Registered Sucessfully",
          },
        });
      } else {
        res.status(200).send({
          baseResponse: { status: 0, msg: "All feilds are required" },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const crmUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(200).send({
        baseResponse: { status: 0, msg: "All feilds are required" },
      });
    } else {
    }
    const checkUser = await CRMUserModel.findOne({
      $and: [{ email: email }, { password: password }],
    });
    if (checkUser) {
      const accesstoken = jwt.sign(
        {
          username: checkUser.name,
        },
        process.env.ACCESS_TOKEN_SECRETE,
        { expiresIn: "30s" }
      );
      const refreshtoken = jwt.sign(
        {
          username: checkUser.name,
        },
        process.env.REFRESH_TOKEN_SECRETE,
        { expiresIn: "1d" }
      );
      await CRMUserModel.updateOne(
        {
          $and: [{ email: email }, { password: password }],
        },
        { $set: { refreshToken: refreshtoken } }
      );
      res.cookie("jwt", refreshtoken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).send({
        baseResponse: { status: 1, msg: "user logged in successfully" },
        response: { accesstoken: accesstoken },
      });
    } else {
      res.status(200).send({
        baseResponse: { status: 0, msg: "user id or password is wrong" },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { homePage, crmUserRegister, crmUserLogin };
