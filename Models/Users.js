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
    commercial_name: String,
    nit_id: Number,
    national_id: {
        type: Number,
        required : true
    },
    birth: String,
    gender: String,
    address: String,
    neigborhood: String,
    city: String,
    state: String,
    status: String,
    phone: Number,
    emergency_name: String,
    emergency_surname: String,
    emergency_address: String,
    emergency_phone: Number,
    emergency_relatioship: String,
    type: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required : true
    },
    activity: String,
    avatar: {
        type: String,
        default: 'default.png'
    },
    docs: {
        national_id: String,
        bank_statement: String,
        rut: String,
        camara_comercio: String
    },
    ref_buildings: {
        type: Schema.ObjectId,
        ref: "Buildings",
        required : false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Users', UsersSchema, 'users');
