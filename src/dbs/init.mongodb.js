'use strict'
const mongoose = require('mongoose');
const connectString = process.env.MONGODB_CONNECTSTRING;
const {countConnect} = require('../helpers/check.connect')

// try {
//     mongoose.connect(connectString);
//     console.log("Success connected db")
//   } 
// catch (error) {
//     handleError(error);
// }
class Database {
    constructor(){
        this.connect()
    }
    //connect
    async connect(type='mongodb'){
        try {
            if (1===1){
                mongoose.set('debug',true)
                mongoose.set('debug',{color:true})
            }
            await mongoose.connect(connectString,{
                maxPoolSize:50
                })
            console.log("Success connected db")
            countConnect()
          } 
        catch (error) {
            handleError(error);
            console.error("Database connection error:", error);
        }
    }
    static getInstance(){
        if (!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance 
    }
}
const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb
