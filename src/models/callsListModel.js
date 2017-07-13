const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CallsScheme = new Schema({
  _contact: { type: Number, ref: 'Contacts' },
  call: String,
});

module.exports = mongoose.model('Calls', CallsScheme);
