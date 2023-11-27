const {Schema, model} = require('mongoose');

const BuildingsSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    address: String,
    description: String,
    ref_companies: {
        type: Schema.ObjectId,
        ref: "Companies",
        required : false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Buildings', BuildingsSchema, 'buildings');
