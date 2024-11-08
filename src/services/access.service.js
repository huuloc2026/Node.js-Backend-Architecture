"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("../services/keyToken.service");
const { createTokenPair } = require("../auth/auth.utils");
const { getInforData } = require("../utils");

const successResponse = require("../responses/success.response");
const errorResponse = require("../responses/error.response");

const roleShop = {
  SHOP: "SHOP",
  WRITER: "000001",
  EDITOR: "000002",
  ADMIN: "ADMIN",
};
class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      //check email exist
      const modelShop = await shopModel.findOne({ email }).lean();
      if (modelShop) {
        throw new Error("Shop already registered");
      }
      const Hashpassword = await bcrypt.hash(
        password,
        parseInt(process.env.NUMBER_HASH_BCRYPT, 10)
      );

      const newShop = await shopModel.create({
        name,
        email,
        password: Hashpassword,
        role: [roleShop.SHOP],
      });

      if (newShop) {
        // version easy - public key - privatekey
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");
        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });
        if (!keyStore) {
          throw new Error("Failed to store keys in the key store");
        }
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );
        console.log(`Create token success:: ${tokens}`);
        return successResponse(201, "Shop created successfully", {
          shop: getInforData({
            fields: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        });
      }
      throw new Error("Failed to create the shop");
    } catch (error) {
      throw new Error(error.message || "Internal Server Error");
    }
  };
}
module.exports = AccessService;
