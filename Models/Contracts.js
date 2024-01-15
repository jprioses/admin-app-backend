const {Schema, model} = require('mongoose');

const ContractsSchema = new Schema({
    value: {
        type: String,
        required : true
    },
    number: Number,
    date_init: {
        type: String,
        required: true
    },
    date_final: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    contract_model: {
        type: String,
        default: 'contract_model_default.pdf'
    },
    ref_buildings: {
        type: Schema.ObjectId,
        ref: "Buildings",
        required : true
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
    activity: String,
    signature: String,
    fingerprint: String,
    contract: String,
    status: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Contracts', ContractsSchema, 'contracts');
