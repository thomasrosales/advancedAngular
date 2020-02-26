var express = require('express');
var app = express();
var User = require('../models/user');

app.get('/', (req, res, next) => {

    User.find({}, 'nombre email image rol').exec((err, Users) => {
        if (err) {
            res.status(500).json({
                status: false,
                description: 'Error loading users.',
                errors: err
            });
        }
        console.log(Users);
        res.status(200).json({
            status: true,
            description: '...',
            users: Users
        }); // EVERYTHING OK
    }); //GET   
});

module.exports = app; //EXPORTA FUERA DE ESTE ARCHIVO