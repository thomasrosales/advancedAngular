var express = require('express');
var app = express();

app.get('/', (req, res, next) => {
    return res.status(200).json({
        status: true,
        description: 'ok'
    }); // EVERYTHING OK
});

module.exports = app; //EXPORTA FUERA DE ESTE ARCHIVO