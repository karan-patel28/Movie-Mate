const mongoose = require('mongoose');

const callCountSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
            unique: true
        },
        count: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { collection: 'call-data' }
);

module.exports = mongoose.model('call-data', callCountSchema);
