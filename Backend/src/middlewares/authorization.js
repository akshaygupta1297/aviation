const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtEncode = (id, email, userType) => {
  return jwt.sign(
    {
      id: id,
      email: email,
      userType: userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    }
  );
};

const jwtDecode = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
module.exports = {
  jwtEncode,
  jwtDecode,
};
