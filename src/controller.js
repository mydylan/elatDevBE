const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Contact = mongoose.model('Contact');
const History = mongoose.model('History');

const _sendError = (err, res) => err && res.send(err);

const valueToNumber = (obj) => {
  let result = {};
  Object.keys(obj).forEach(key => result[key] = Number(obj[key]));
  return result;
}

exports.getContacts = (req, res) => {
  Contact.paginate({}, valueToNumber(req.query), (err, contacts) => {
    _sendError(err, res);
    res.json(contacts);
  });
};

exports.readContact = (req, res) => {
  Contact.findById(req.params.contactId, (err, contacts) => {
    _sendError(err, res);
    res.json(contacts);
  });
};

exports.createContact = (req, res) => {
  Contact.create(req.body, (err, contacts) => {
    _sendError(err, res);
    const history = { contact: contacts, history: req.body.history };
    History.create(history, _sendError)
    res.json(contacts);
  });
};

exports.updateContact = (req, res) => {
  Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contacts) => {
    if (err) {
      res.send(err);
    } else {
      History.findOneAndUpdate(
        { contact: new ObjectId(req.params.contactId) },
        { $push: { history: { $each: req.body.history } } },
        { new: true },
        _sendError
      );
      res.json(contacts);
    }
  });
};

exports.deleteContact = (req, res) => {
  Contact.remove({ _id: req.params.contactId }, (err, contacts) => {
    _sendError(err, res);
    History.remove({ contact: new ObjectId(req.params.contactId) }, _sendError)
    res.json({ message: 'Contact successfully deleted' });
  });
};

exports.getHistory = (req, res) => {
  History.find({ contact: new ObjectId(req.params.contactId) }, (err, history) => {
    _sendError(err, res);
    res.json(history);
  });
};
