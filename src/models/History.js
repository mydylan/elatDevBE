const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoryScheme = new Schema({
  contact: { type: "ObjectId", ref: 'Contact' },
  history: Array
});

module.exports = mongoose.model('History', HistoryScheme);
