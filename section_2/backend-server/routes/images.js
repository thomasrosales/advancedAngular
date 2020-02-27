var express = require('express');
var app = express();
var Hospital = require('../models/hospital');
var User = require('../models/user');
var Doctor = require('../models/doctor');
const path = require('path');
const fs = require('fs');

app.get('/:type/:image', (req, res, next) => {

    var collection = req.params.type;
    var image = req.params.image;
    var validateCollection = ['users', 'doctors', 'hospitals'];


    if (!collection && validateCollection.indexOf(collection) < 0) {
        return res.status(400).json({
            status: false,
            description: { message: 'Error Getting Image.' },
            error: { message: 'Collection Does Not Exist' }
        });
    }

    var pathImage = path.resolve(__dirname, `../uploads/${collection}/${image}`);
    console.log(pathImage);

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        var pathNoImage = path.resolve(__dirname, `../assets/no-img.jpg`);
        res.sendFile(pathNoImage);
    }
});

module.exports = app; //EXPORTA FUERA DE ESTE ARCHIVO