var express = require('express');
var app = express();
var Hospital = require('../models/hospital');
var User = require('../models/user');
var Doctor = require('../models/doctor');
var middlewareAuthenticaion = require('../middlewares/authentication');

/**
 * GET ALL USERS
 */
app.get('/all/:filter', (req, res, next) => {

    var filter = req.params.filter;
    var regex = new RegExp(filter, 'i');

    Promise
        .all([findHospitals(filter, regex), findDoctor(filter, regex), findUser(filter, regex)])
        .then(response => {
            res.status(200).json({
                status: true,
                description: '...',
                hospitals: response[0],
                doctors: response[1],
                users: response[2]
            }); // EVERYTHING OK 
        });

    /* findHospitals(filter, regex).then(response => {
         res.status(200).json({
             status: true,
             description: '...',
             result: response
         }); // EVERYTHING OK 
     });*/

});

function findHospitals(filter, regex) {
    return new Promise((resolve, reject) => {
        Hospital
            .find({ nombre: regex })
            .populate('user', 'nombre email')
            .exec((err, hospitals) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hospitals);
                }
            });
    });
}

function findDoctor(filter, regex) {
    return new Promise((resolve, reject) => {
        Doctor
            .find({ nombre: regex })
            .populate('user', 'nombre email')
            .populate('hospital', 'nombre')
            .exec((err, doctors) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doctors);
                }
            });
    });
}

function findUser(filter, regex) {
    return new Promise((resolve, reject) => {
        User
            .find({}, 'nombre email')
            .or([{ nombre: regex }, { email: regex }])
            .exec((err, users) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
    });
}

module.exports = app; //EXPORTA FUERA DE ESTE ARCHIVO