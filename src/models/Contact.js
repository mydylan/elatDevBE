const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactScheme = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Contact', ContactScheme);
