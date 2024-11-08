const keytokenModel = require("../models/keytoken.model");
const successResponse = require("../responses/success.response");
const errorResponse = require("../responses/error.response");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      //version2
      const filter = { user: userId };
      const update = {
        publicKey,
        privateKey,
        refreshTokenUsed: [],
        refreshToken,
      };
      const options = { upsert: true, new: true };

      const tokens = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      console.log("tokens::::", tokens);
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error.message;
    }
  };
}

module.exports = KeyTokenService;
