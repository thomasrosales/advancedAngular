var express = require('express');
var app = express();
var bcrypt = require('bcrypt');
var User = require('../models/user');

/**
 * GET ALL USERS
 */
app.get('/', (req, res, next) => {

    User.find({}, 'nombre email image rol').exec((err, Users) => {
        if (err) {
            return res.status(500).json({
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

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    var user = new User({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt),
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

        res.status(201).json({
            status: true,
            description: '...',
            user: persistentUser
        }); // EVERYTHING OK

    });
});

/**
 * UPDATE USER
 */
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body; // PARAMETROS NUEVOS

    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                status: false,
                description: 'Error getting user',
                errors: err
            });
        }

        if (!user) {
            return res.status(400).json({
                status: false,
                description: 'User dont exist: ' + id,
                errors: { message: '...' }
            });
        }

        user.nombre = body.nombre;
        user.email = body.email;
        user.rol = body.rol;

        user.save((err, persistentUser) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    description: 'Error updating user',
                    errors: err
                });
            }

            persistentUser.password = "*******";

            res.status(200).json({
                status: true,
                description: '...',
                user: persistentUser
            }); // EVERYTHING OK
        });
    });
});

/**
 * DELETE USER
 */
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    User.findByIdAndRemove(id, (err, deletedUser) => {
        if (err) {
            return res.status(500).json({
                status: false,
                description: 'Error deleting user',
                errors: err
            });
        }
        if (!deletedUser) {
            return res.status(500).json({
                status: false,
                description: 'User: ' + id + ' does not exist.',
                errors: { message: '...' }
            });
        }

        res.status(200).json({
            status: true,
            description: '...',
            user: deletedUser
        }); // EVERYTHING OK
    });
});

module.exports = app; //EXPORTA FUERA DE ESTE ARCHIVO