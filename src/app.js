require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const {default:helmet} = require('helmet');
const compression = require('compression');
const router = require('../src/routes/index')
const app = express();


//init middleware
app.use(morgan('dev'))
app.use(helmet());
app.use(compression())

//init db
require('./dbs/init.mongodb')
// const {checkOverload} = require('./helpers/check.connect')
// checkOverload()


//init routes
app.use('',router)
//init middleware

//handle error


module.exports = app