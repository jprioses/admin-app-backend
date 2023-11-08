const {Schema, model} = require('mongoose');

const ContractsSchema = new Schema({
    value: {
        type: Number,
        required : true
    },
    date_init: {
        type: Date,
        required: true
    },
    date_final: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    doc_model: {
        type: String,
        required: true
    },
    ref_companies: {
        type: Schema.ObjectId,
        ref: "Companies",
        required : true
    },
    ref_users: {
        type: Schema.ObjectId,
        ref: "Users",
        required : true
    },
    signature: String,
    fingerprint: String,
    doc: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Contracts', ContractsSchema, 'contracts');
