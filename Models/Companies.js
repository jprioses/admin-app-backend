const {Schema, model} = require('mongoose');

const CompaniesSchema = new Schema({
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
    commercial_name: {
        type: String,
        required : true
    },
    nit_id: {
        type: String,
        required : true
    },
    activity: {
        type: String,
        required : true
    },
    city: String,
    address: String,
    phone: Number,
    docs: {
        rut: String,
        camara_comercio: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Companies', CompaniesSchema, 'companies');
