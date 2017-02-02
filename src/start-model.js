const mongoose = require('./mongoose');

const StartSchema = new mongoose.Schema({
    example: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('start', StartSchema);
