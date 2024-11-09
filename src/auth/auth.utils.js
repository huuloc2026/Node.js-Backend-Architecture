"use strict";
const jwt = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await jwt.sign(payload, publicKey, {
      expiresIn: "2 days",
    });
    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    //JWT Verify

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`error verify:: ${err}`);
      } else {
        console.log(`decode:: ${decode}`);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("access_auth-util.js", error);
  }
};

const authentication = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new Error("Authorization token required");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});
module.exports = { createTokenPair, authentication };
