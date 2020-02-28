var express = require('express');
var app = express();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var SECRET_KEY = require('../config/config').SECRET_KEY;
var GOOGLE_CLIENT_ID = require('../config/config').GOOGLE_CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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
        if (!body.password ||
            !bcrypt.compareSync(body.password, persistentUser.password)
        ) {
            return res.status(400).json({
                status: false,
                description: 'User with password: ' + body.password + ' is wrong.', //SACAR
                errors: {}
            });
        }

        //TOKEN
        persistentUser.password = '********';
        var token = jwt.sign({ user: persistentUser }, SECRET_KEY, {
            expiresIn: 3600
        });

        res.status(200).json({
            status: true,
            description: '...',
            user: persistentUser,
            id: persistentUser._id,
            token: token
        }); // EVERYTHING OK
    });
});

/**
 * GOOGLE AUTHENTICATION
 */
app.post('/google', async(req, res, next) => {
    var token = req.body.token;

    if (!token) {
        return res.status(400).json({
            status: false,
            description: 'Token is required.', //SACAR
            errors: {}
        });
    }

    var googleUser = await verify(token).catch(err => {
        return res.status(403).json({
            status: false,
            description: 'Token Invalid', //SACAR
            errors: err
        });
    });

    User.findOne({ email: googleUser.email }, (err, persistentUser) => {
        if (err) {
            return res.status(400).json({
                status: false,
                description: 'Error Getting User', //SACAR
                errors: err
            });
        }

        if (persistentUser) {
            var token = jwt.sign({ user: persistentUser }, SECRET_KEY, {
                expiresIn: 3600
            });
            res.status(200).json({
                status: true,
                description: '...',
                user: persistentUser,
                id: persistentUser._id,
                token: token
            }); // EVERYTHING OK
        } else {
            // CREAR USUARIO SI NO EXISTE
            var newUser = new User();
            console.log(googleUser);
            newUser.nombre = googleUser.name;
            newUser.email = googleUser.email;
            newUser.image = googleUser.image;
            newUser.google = true;
            newUser.password = '1234';

            newUser.save((err, persistentNewUser) => {
                var token = jwt.sign({ user: persistentNewUser }, SECRET_KEY, {
                    expiresIn: 3600
                });
                res.status(200).json({
                    status: true,
                    description: '...',
                    user: persistentNewUser,
                    id: persistentNewUser._id,
                    token: token
                }); // EVERYTHING OK
            });
        }
    });
});

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    //const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        name: payload.name,
        email: payload.email,
        image: payload.picture,
        google: true
    };
}

module.exports = app;