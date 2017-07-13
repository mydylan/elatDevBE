const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Contacts = mongoose.model('Contacts');
const Calls = mongoose.model('Calls');

exports.getContacts = function(req, res) {
  Contacts.find({}, function(err, contacts) {
    if (err) {
      res.send(err);
    }
    res.json(contacts);
  });
};

exports.readContact = function(req, res) {
  Contacts.findById(req.params.contactId, function(err, contacts) {
    if (err) {
      res.send(err);
    }
    res.json(contacts);
  });
};

exports.createContact = function(req, res) {
  Contacts.create(req.body, function(err, contacts) {
    if (err) {
      res.send(err);
    }
    Calls.create({contact: contacts, history: req.body.history}, function(err, res) {
      if (err) {
        res.send(err);
      }
    });
    res.json(contacts);
  });
};

exports.updateContact = function(req, res) {
  Contacts.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, function(err, contacts) {
    if (err) {
      res.send(err);
    }
    Calls.findOneAndUpdate({"contact": new ObjectId(req.params.contactId)}, {$push: {"history": {"$each": req.body.history}}}, { new: true }, function(err, contacts) {
      if (err) {
        res.send(err);
      }
    });
    res.json(contacts);
  });
};

exports.deleteContact = function(req, res) {
  Contacts.remove({ _id: req.params.contactId }, function(err, contacts) {
    if (err) {
      res.send(err);
    }
    Calls.remove({"contact": new ObjectId(req.params.contactId)}, function(err, contacts) {
      if (err) {
        res.send(err);
      }
    })
    res.json({ message: 'Contact successfully deleted' });
  });
};

exports.getCalls = function(req, res) {
  Calls.find({"contact": new ObjectId(req.params.contactId)}, function(err, calls) {
    if (err) {
      res.send(err);
    }
    res.json(calls);
  });
};
