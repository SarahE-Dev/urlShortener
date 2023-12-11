const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    originalUrl: {
        type: String
    },
    shortUrl: {
        type: String
    }
})

module.exports = mongoose.model('URL', URLSchema)