const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CallsScheme = new Schema({
  contact: { type: "ObjectId", ref: 'Contacts' },
  history: Array
});

module.exports = mongoose.model('Calls', CallsScheme);
