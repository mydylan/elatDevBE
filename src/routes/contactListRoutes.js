module.exports = function(app) {
  const contactList = require('../controllers/contactListController');

  app.route('/contacts')
    .get(contactList.getContacts)
    .post(contactList.createContact);

  app.route('/contacts/:contactId')
    .put(contactList.updateContact)
    .delete(contactList.deleteContact);

  app.route('/contacts/:contactId/calls')
    .get(contactList.getCalls)
};
