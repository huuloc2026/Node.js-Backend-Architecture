const express = require('express');
const morgan = require('morgan');
const {default:helmet} = require('helmet');
const compression = require('compression');
const app = express();


//init middleware
app.use(morgan('dev'))
app.use(helmet());
app.use(compression())
//init routes
app.get('/',(req,res,next)=>{
    return res.status(200).json({
        message: "Welcome to my app 2",
    })
})

//init db

//init middleware

//handle error


module.exports = app