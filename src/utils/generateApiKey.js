const apiKeyModel = require("../models/apiKey.model");

const crypto = require("crypto");

const generateApiKey = () => crypto.randomBytes(64).toString("hex"); // Or any other logic

module.exports = { generateApiKey };
