const {Schema, model} = require('mongoose');

const UsersSchema = new Schema({
    name1: {
        type: String,
        required : true
    },
    name2: String,
    surename1: {
        type: String,
        required : true
    },
    surename2: {
        type: String,
        required : true
    },
    commercial_name: String,
    nit_id: Number,
    national_id: {
        type: Number,
        required : true
    },
    birth: Date,
    address: String,
    neigborhood: String,
    city: String,
    state: String,
    phone: Number,
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
