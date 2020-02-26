// REQUIERES

var express = require('express');
var mongoose = require('mongoose');

// INIT

var app = express(); // CREATE SERVIDOR


// BBDD
mongoose.connect('mongodb://localhost:27017/HospitalDB', (err, res) => {
    if (err) {
        throw err;
    }

    console.log('BD: \x1b[36m%s\x1b[0m', 'online');
});


// ROUTES

app.get('/', (req, res, next) => {
    res.status(200).json({
        status: true,
        description: 'ok'
    }); // EVERYTHING OK
});

// LISTENERS

app.listen(3000, () => {
    console.log('Node/Express: \x1b[36m%s\x1b[0m', 'online');
});