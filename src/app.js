const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Contacts = require('./models/contactListModel');
const Calls = require('./models/callsListModel');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes/contactListRoutes');

mongoose.connect(config.mongodb.uri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

module.exports = app;
