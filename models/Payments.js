const {Schema, model} = require('mongoose');

const PaymentsSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    description: String,
    type: {
        type: String,
        required: true
    },
    fields: {
        type: [String],
        required: true
    },
    values: {
        type: [Number],
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: String,
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
    signature: String,
    fingerprint: String,
    doc: String,
    comments: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Payments', PaymentsSchema, 'payments');