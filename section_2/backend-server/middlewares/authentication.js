var jwt = require('jsonwebtoken');
var SECRET_KEY = require('../config/config').SECRET_KEY;

exports.tokenVerification = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SECRET_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({
                status: false,
                description: 'Incorrect Token',
                errors: err
            });
        }

        req.user = decode.user; //EXTRAIGO EL USUARIO Y LO COLOCA EN EL REQUEST

        next(); //CONTINUA CON LA EJECUCION NORMAL DE LOS OTROS METODOS
    });
};

exports.adminVerification = function(req, res, next) {
    var user = req.user; // COMO EL MIDDLEWARE DE ARRIBA NO TIENE RETURN CONTINUA CON EL REQ.USER CON VALOR

    if (user.role === 'ADMIN_ROL') {
        next();
    } else {
        return res.status(401).json({
            status: false,
            description: 'Incorrect Token',
            errors: { mesage: 'inorrect token admin.' }
        });
    }
};

exports.profileVerification = function(req, res, next) {
    var user = req.user; // COMO EL MIDDLEWARE DE ARRIBA NO TIENE RETURN CONTINUA CON EL REQ.USER CON VALOR
    var id = req.params.id;

    console.log(id);

    if (user.role === 'ADMIN_ROL' || user._id === id) {
        next();
        return;
    } else {
        return res.status(401).json({
            status: false,
            description: 'Incorrect Token',
            errors: { mesage: 'Incorrect access to profile.' }
        });
    }
};
/**
 * USER MIDDLEWARE
 */
/*
    app.use('/', (req, res, next) => {

        var token = req.query.token;

        jwt.verify(token, SECRET_KEY, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    status: false,
                    description: 'Incorrect Token',
                    errors: err
                });
            }
            next(); //CONTINUA CON LA EJECUCION NORMAL DE LOS OTROS METODOS
        });
    });*/