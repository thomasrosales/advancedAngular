var express = require('express');
var app = express();
var Hospital = require('../models/hospital');
var User = require('../models/user');
var Doctor = require('../models/doctor');
var middlewareAuthenticaion = require('../middlewares/authentication');
var fileUpload = require('express-fileupload');
var fs = require('fs'); //FILE SYSTEM

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

        /*res.status(200).json({
            status: true,
            description: '...',
            result: ''
        });*/ // EVERYTHING OK
        updateImageToCollection(fileType, userId, fileName, res);
    });





});

function updateImageToCollection(collection, id, fileName, res) {
    if (collection === 'users') {
        User.findById(id, (err, persistentUser) => {
            if (err || !persistentUser) {
                return res.status(400).json({
                    status: false,
                    description: { message: 'Error Uploading User.' },
                    error: err
                });
            }

            var oldPath = './uploads/users/' + persistentUser.image;

            console.log(oldPath);

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            persistentUser.image = fileName;
            persistentUser.save((errUser, updatedUser) => {
                if (errUser) {
                    return res.status(400).json({
                        status: false,
                        description: { message: 'Error Uploading User.' },
                        error: errUser
                    });
                }
                return res.status(200).json({
                    status: true,
                    description: 'Image Updated',
                    user: updatedUser
                });
            });
        });
    }

    if (collection === 'doctors') {
        Doctor.findById(id, (err, persistentDoctor) => {
            if (err || !persistentDoctor) {
                return res.status(400).json({
                    status: false,
                    description: { message: 'Error Uploading Doctor.' },
                    error: err
                });
            }

            var oldPath = './uploads/doctors/' + persistentDoctor.image;

            console.log(oldPath);

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            persistentDoctor.image = fileName;
            persistentDoctor.save((errDoctor, updatedDoctor) => {
                if (errDoctor) {
                    return res.status(400).json({
                        status: false,
                        description: { message: 'Error Uploading Doctor.' },
                        error: errDoctor
                    });
                }
                return res.status(200).json({
                    status: true,
                    description: 'Image Updated',
                    doctor: updatedDoctor
                });
            });
        });
    }

    if (collection === 'hospitals') {
        Hospital.findById(id, (err, persistentHospital) => {
            if (err || !persistentHospital) {
                return res.status(400).json({
                    status: false,
                    description: { message: 'Error Uploading Hospital.' },
                    error: err
                });
            }

            var oldPath = './uploads/hospitals/' + persistentHospital.image;

            console.log(oldPath);

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            persistentHospital.image = fileName;
            persistentHospital.save((errHospital, updatedHospital) => {
                if (errHospital) {
                    return res.status(400).json({
                        status: false,
                        description: { message: 'Error Uploading Hospital.' },
                        error: errHospital
                    });
                }
                return res.status(200).json({
                    status: true,
                    description: 'Image Updated',
                    doctor: updatedHospital
                });
            });
        });
    }
}

module.exports = app; //EXPORTA FUERA DE ESTE ARCHIVO