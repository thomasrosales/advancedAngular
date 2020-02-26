var express = require('express');
var app = express();
var bcrypt = require('bcrypt');
var User = require('../models/user');

/**
 * LOGIN
 */
app.post('/', (req, res) => {

    var body = req.body;

    User.findOne({ email: body.email }, (err, persistentUser) => {

        if (err) {
            return res.status(500).json({
                status: false,
                description: 'Error getting users.',
                errors: err
            });
        }

        if (!persistentUser) {
            return res.status(400).json({
                status: false,
                description: 'User with email: ' + body.email + ' is wrong.', //SACAR
                errors: {}
            });
        }
        if (!body.password || !bcrypt.compareSync(body.password, persistentUser.password)) {
            return res.status(400).json({
                status: false,
                description: 'User with password: ' + body.password + ' is wrong.', //SACAR
                errors: {}
            });
        }

        //TOKEN


        res.status(200).json({
            status: true,
            description: '...',
            user: persistentUser,
            id: persistentUser._id
        }); // EVERYTHING OK
    });
});


module.exports = app;