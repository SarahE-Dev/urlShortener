const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    original_url: {
        type: String
    },
    short_url: {
        type: String
    }
})

module.exports = mongoose.model('URL', URLSchema)