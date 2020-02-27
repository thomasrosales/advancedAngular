var express = require('express');
var app = express();
var Hospital = require('../models/hospital');
var User = require('../models/user');
var Doctor = require('../models/doctor');
var middlewareAuthenticaion = require('../middlewares/authentication');
var fileUpload = require('express-fileupload');

// default options
app.use(fileUpload());

/**
 * GET ALL BY FILTER/collection/:table/:filter
 */
app.put('/:type/:id', (req, res, next) => {

    var fileType = req.params.type;
    var userId = req.params.id;

    var validatedCollections = ['users', 'doctors', 'hospitals'];

    if (validatedCollections.indexOf(fileType) < 0) {
        return res.status(400).json({
            status: false,
            error: { message: 'Collection Not Allowed.' }
        });
    }

    if (!userId) {
        return res.status(400).json({
            status: false,
            error: { message: 'User Required.' }
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            status: false,
            error: { message: 'No files were uploaded.' }
        });
    }

    // VALIDATIONS

    var file = req.files.image;
    var fileName = file.name.split('.'); // ARREGLO CORTADO POR PUNTO
    var fileExtention = fileName[fileName.length - 1]; // OBTENGO LA EXTENSION

    var validatedExtention = ['png', 'jpg', 'gif', 'jpeg'];

    if (validatedExtention.indexOf(fileExtention) < 0) {
        return res.status(400).json({
            status: false,
            error: { message: 'Extention Not Allowed.' }
        });
    }

    // NOMBRE UNICO
    var fileName = `${userId}-${new Date().getMilliseconds()}.${fileExtention}`;

    // GUARDAR PATH
    var path = `./uploads/${fileType}/${fileName}`;

    file.mv(path, (err) => {
        if (err) {
            return res.status(400).json({
                status: false,
                error: { message: 'Error Uploading File.' }
            });
        }

        //res.send('File uploaded!');

        res.status(200).json({
            status: true,
            description: '...',
            result: ''
        }); // EVERYTHING OK
    });




});

module.exports = app; //EXPORTA FUERA DE ESTE ARCHIVO