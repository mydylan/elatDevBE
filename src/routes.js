module.exports = function(app) {
  const contactList = require('./controller');

  app.route('/contacts')
    .get(contactList.getContacts)
    .post(contactList.createContact);

  app.route('/contacts/:contactId')
    .get(contactList.readContact)
    .put(contactList.updateContact)
    .delete(contactList.deleteContact);

  app.route('/contacts/:contactId/history')
    .get(contactList.getHistory)
};
