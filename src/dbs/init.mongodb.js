"use strict";
const mongoose = require("mongoose");

const InforDB = {
  MONGODB_USERNAME: process.env.MONGODB_USERNAME,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
};

const connectString =
  `mongodb+srv://${InforDB.MONGODB_USERNAME}:${InforDB.MONGODB_PASSWORD}@cluster0.20izq.mongodb.net/${InforDB.MONGODB_DB_NAME}?retryWrites=true&w=majority`;
const { countConnect,checkOverload } = require("../helpers/check.connect");

class Database {
  constructor() {
    this.connect();
  }
  //connect
  async connect(type = "mongodb") {
    try {
      if (1 === 1) {
        mongoose.set("debug", true);
        mongoose.set("debug", { color: true });
      }
      await mongoose.connect(`${connectString}`, {
        maxPoolSize: 50,
      });
      console.log("Success connected db ✅✅✅ ");
      countConnect();
      //checkOverload()
    } catch (error) {
      handleError(error);
      console.error("❌❌❌ Database connection error:", error);
    }
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
