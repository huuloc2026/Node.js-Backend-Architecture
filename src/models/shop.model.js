'use strict'
//!dmbg
const mongoose = require('mongoose'); // Erase if already required
const Document_name = 'Shop'
const COLLECTION_NAME = "VirtShops"
// Declare the Schema of the Mongo model
const shopSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        maxlength: 150,
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password:{
        type:String,
        required:true,
    },
    status: {
        type: [String],
        enum: ['active','inactive'],
        default: 'inactive'
    },
    verify:{
        type: Boolean,
        default: false,
    },
    role: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME, // Specify the collection name
});

//Export the model
module.exports = mongoose.model(Document_name, shopSchema);