const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CallsScheme = new Schema({
  contact: { type: Number, ref: 'Contacts', index: true },
  call: String,
});

module.exports = mongoose.model('Calls', CallsScheme);
