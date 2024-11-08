'use strict'
const crypto = require('crypto')
const apiKeyModel = require("../models/apiKey.model")

const findbyID = async (key) => {
    const testKey = await apiKeyModel.create({key: crypto.randomBytes(10).toString('hex'),permissions: '0000'})
    console.log(testKey);
    const objectKey = await apiKeyModel.findOne({key,status:true}).lean()
    return objectKey
}
module.exports = {
    findbyID
}