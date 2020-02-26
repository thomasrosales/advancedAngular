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
    }
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