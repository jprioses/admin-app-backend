const {Schema, model} = require('mongoose');

const CredentialsSchema = new Schema({
    username: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    role: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    ref_users: {
        type: Schema.ObjectId,
        ref: "Users",
        required : false
    },
    permissions: [{
        ref_buildings: {
            type: Schema.ObjectId,
            ref: "Buildings",
            required : false
        },
        name: String
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Credentials', CredentialsSchema, 'credentials');
