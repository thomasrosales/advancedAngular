var express = require('express');
var app = express();
var User = require('../models/user');


/**
 * GET ALL USERS
 */
app.get('/', (req, res, next) => {

    User.find({}, 'nombre email image rol').exec((err, Users) => {
        if (err) {
            res.status(500).json({
                status: false,
                description: 'Error loading users.',
                errors: err
            });
        }
        res.status(200).json({
            status: true,
            description: '...',
            users: Users
        }); // EVERYTHING OK
    }); //GET   
});


/**
 * CREATE USER
 */

app.post('/', (req, res) => {

    var body = req.body; // BODY-PARSER PACKAGE CAPTURA Y PARSEA LOS PARAMETROS ENVIADOS POR JSON

    var user = new User({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        image: body.image,
        rol: body.rol
    });

    user.save((err, persistentUser) => {
        if (err) {
            return res.status(400).json({
                status: false,
                description: 'Error creating users.',
                errors: err
            });
        }

        return res.status(201).json({
            status: true,
            description: '...',
            user: persistentUser
        }); // EVERYTHING OK

    });
});

module.exports = app; //EXPORTA FUERA DE ESTE ARCHIVO