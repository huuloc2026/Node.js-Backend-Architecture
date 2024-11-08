'use strict'
const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECOND = 5000
//count connect 
const countConnect = () => {
    const numberConnect = mongoose.connect.length
    console.log(`Number of connection: ${numberConnect}`)
    
}

//check overloads
const checkOverload = () => {
    setInterval(()=>{
        const numberConnectOverload = mongoose.connect.length;
        const numberCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        //Example maximum number of connection base on number of cores;
        const maxConnection = numberConnectOverload * 5;
        console.log(`Active connections: ${numberConnectOverload}`)
        console.log(`Memory usage: ${memoryUsage/1024/1024} MB`)
        if (numberConnectOverload > maxConnection){
            console.log(`Connection overload detected`)
        }
    },_SECOND) // Monitor every 5 second
}
module.exports = {countConnect,checkOverload}