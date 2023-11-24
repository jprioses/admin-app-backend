const {Schema, model} = require('mongoose');

const AttendanceSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    hour_init: {
        type: String,
        required: true
    },
    hour_final: {
        type: String,
        required: true
    },
    attendace: {
        type: String,
        required: true
    },
    justify: String,
    status: String,
    payment_state: String,
    payment_type: String,
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

module.exports = model('Attendance', AttendanceSchema, 'attendance');
