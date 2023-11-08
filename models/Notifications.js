const {Schema, model} = require('mongoose');

const NotificationsSchema = new Schema({
    description: String,
    type: {
        type: String,
        required: true
    },
    state: String,
    ref_type: {
        type: String,
        required: true
    },
    ref: {
        type: Schema.ObjectId,
        ref: ref_type,
        required : true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Notifications', NotificationsSchema, 'notifications');