"use strict";
const apiKeyModel = require("../models/apiKey.model");

const findbyID = async (key) => {
  try {
    const objectKey = await apiKeyModel.findOne({ key, status: true }).lean();
    if (!objectKey) {
      throw new Error("API key not found");
    }
    return objectKey;
  } catch (error) {
    throw new Error(`Error fetching API key: ${error.message}`);
  }
};
module.exports = {
  findbyID,
};
