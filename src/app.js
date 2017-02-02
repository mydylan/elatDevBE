const express = require('express');
const StartModel = require('./start-model');

const app = express();

app.get('/api/start', function (req, res) {
    StartModel.find({}, function (err, docs) {
        res.send({
            api: true,
            docs: docs
        })
    });
});

module.exports = app;

