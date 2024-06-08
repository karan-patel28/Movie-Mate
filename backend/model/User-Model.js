const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema(
    {
        user_id: {
            type: Number
        },
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    { collection: 'user-data' }
);

UserSchema.plugin(AutoIncrement, { id: 'user-sequence', inc_field: 'user_id', start_seq: 1001 });

module.exports = mongoose.model('user-data', UserSchema);
