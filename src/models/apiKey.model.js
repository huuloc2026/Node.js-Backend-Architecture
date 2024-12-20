const {Schema,model} = require('mongoose'); // Erase if already required
const Document_name = 'apiKey'
const COLLECTION_NAME = "Virt-apiKey"
// Declare the Schema of the Mongo model
const apiKeySchema = new Schema({
    key:{
        type:String,
        required:true,
        unique:true,
    },
    status:{
        type: Boolean,
        default:true,
    },
    permissions:{
        type:[String],
        required: true,
        enum: ['0000','1111','2222']
    },
},{
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(Document_name, apiKeySchema);