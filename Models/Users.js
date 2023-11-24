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
    photo: {
        type: String,
        default: 'default.png'
    },
    docs: {
        national_id: String,
        bank_Statement: String
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
