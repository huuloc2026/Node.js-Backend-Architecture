const {Schema,model} = require('mongoose'); // Erase if already required
const Document_name = 'Keys'
const COLLECTION_NAME = "VirtKeys"
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Shop'
    },
    publicKey:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:Array, 
        default:[]
    },
},{
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(Document_name, keyTokenSchema);