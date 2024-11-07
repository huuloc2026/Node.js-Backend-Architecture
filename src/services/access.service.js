'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('../services/keyToken.service')
const { createTokenPair } = require("../auth/auth.utils");

const roleShop = {
    SHOP: "SHOP",
    WRITER: '000001',
    EDITOR: '000002',
    ADMIN: 'ADMIN'
}
class AccessService {
    static signUp = async ({name,email,password}) => {
        try {
            //check email exist
            const modelShop = await shopModel.findOne({email}).lean();
            if (modelShop){
                 return {
                    code: 400,  // Using 400 for Bad Request
                    message: 'Shop already registered'
                };
            }
            const Hashpassword = await bcrypt.hash(password, parseInt(process.env.NUMBER_HASH_BCRYPT, 10));

            const newShop = await shopModel.create({
                name,
                email,
                password: Hashpassword,
                role: [roleShop.ADMIN,]
            })
          
            newShop.save()
            if (newShop){
                // create privateKey, publicKey
                const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                    modulusLength: 4096,
                });
                const publickeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                })
              
                if (!publickeyString){
                    return {
                        code: 'xxx',
                        message: 'public key string error'
                    }
                }
                const tokens = await createTokenPair({userId:newShop._id,email},publicKey,privateKey)
                console.log(`Create token success:: ${tokens}`)
                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens,
                    }
                }
            }

            } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error',
            }
        }
    }
}
module.exports = AccessService