const {Schema, model} = require('mongoose');

const DocumentsSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    description: String,
    date_init: {
        type: Date,
        required: true
    },
    date_final: {
        type: Date,
        required: true
    },
    status: String,
    ref_payments: {
        type: Schema.ObjectId,
        ref: "Payments",
        required : true
    },  
    ref_contracts: {
        type: Schema.ObjectId,
        ref: "Contracts",
        required : true
    },  
    ref_users: {
        type: Schema.ObjectId,
        ref: "Users",
        required : true
    },
    doc: String,
    comments: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Documents', DocumentsSchema, 'documents');