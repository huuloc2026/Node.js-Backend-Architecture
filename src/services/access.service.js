'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const roleShop = {
    SHOP: SHOP,
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
                    code: 'xxx',
                    message: 'Shop already registered'
                }
            }
            const Hashpassword = await bcrypt.hash(passwordd,process.env.NUMBER_HASH_BCRYPT);
            const newShop = await shopModel.create({
                name,
                email,
                password: Hashpassword,
                roles: [roleShop.SHOP]
            })
            if (newShop){
                // create privateKey, publicKey
                const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                    modulusLength: 4096,
                });
                console.log(privateKey)
                console.log(publicKey)
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