const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).send({
      baseResponse: { status: 0, msg: "user unauthorized" },
    });
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
    if (err)
      return res.status(403).send({
        baseResponse: { status: 0, msg: "forbidden" },
      });
    req.user = decoded.name;
    next();
  });
};

module.exports = { verifyJwt };
