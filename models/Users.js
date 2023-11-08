const {Schema, model} = require('mongoose');

const UsersSchema = new Schema({
    name1: {
        type: String,
        required : true
    },
    name2: String,
    surname1: {
        type: String,
        required : true
    },
    surname2: {
        type: String,
        required : true
    },
    national_id: {
        type: Number,
        required : true
    },
    address: String,
    phone: Number,
    role: {
        type: String,
        required : true
    },
    role_type: String,
    photo: {
        type: String,
        default: 'default.png'
    },
    docs: {
        national_id: String,
        bank_Statement: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Users', UsersSchema, 'users');
