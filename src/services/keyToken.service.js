const keytokenModel = require("../models/keytoken.model")
const successResponse = require('../responses/success.response')
const errorResponse = require('../responses/error.response');

class KeyTokenService {
    static createKeyToken = async ({userId,publicKey,privateKey}) => {

        try {
            
            const token = await keytokenModel.create({
                user: userId,
                publicKey,
                privateKey
            })
            return token ? token.publicKey : null
        } catch (error) {
            return res.status(500).json(errorResponse(500, 'Internal Server Error', {
                message: error.message,
                stack: error.stack, // Optional, could be omitted in production
            }));
        }
    }
}

module.exports = KeyTokenService