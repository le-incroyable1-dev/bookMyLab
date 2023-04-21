const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    lab: {
        required: true,
        type: String
    },
    datetime: {
        required: true,
        type: Date
    },
    professor: {
        required: true,
        type: String
    },
    approved: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Lab', dataSchema)