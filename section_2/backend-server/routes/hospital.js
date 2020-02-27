var express = require('express');
var app = express();
var Hospital = require('../models/hospital');
var middlewareAuthenticaion = require('../middlewares/authentication');

/**
 * GET ALL HOSPITALS
 */
app.get('/', (req, res, next) => {

    var offset = req.query.offset || 0;
    offset = Number(offset);

    Hospital.find({})
        .skip(offset)
        .limit(5)
        .populate('user', 'nombre email')
        .exec((err, Hospitals) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    description: 'Error loading hospitals.',
                    errors: err
                });
            }

            Hospital.count({}, (err, quantity) => {
                res.status(200).json({
                    status: true,
                    description: '...',
                    hospital: Hospitals,
                    total: quantity
                }); // EVERYTHING OK
            });
        }); //GET   
});

/**
 * CREATE HOSPITAL
 */

app.post('/', middlewareAuthenticaion.tokenVerification, (req, res, next) => {

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        image: body.image,
        user: body.user
    });

    hospital.save((err, persistentHospital) => {

        if (err) {
            return res.status(400).json({
                status: false,
                description: 'Error creating hospital.',
                errors: err
            });
        }

        res.status(201).json({
            status: true,
            description: '...',
            hospital: persistentHospital,
            create_by: req.user
        }); // EVERYTHING OK

    });
});

/**
 * UPDATE HOSPITAL BY ID
 */
app.put('/:id', middlewareAuthenticaion.tokenVerification, (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, persistentHospital) => {
        if (err) {
            return res.status(500).json({
                status: false,
                description: 'Error getting hospital',
                errors: err
            });
        }

        if (!persistentHospital) {
            return res.status(400).json({
                status: false,
                description: 'Hospital with id: ' + id + ' does not exist.',
                errors: { messages: '' }
            });
        }

        persistentHospital.nombre = body.nombre;
        persistentHospital.user = body.user;

        persistentHospital.save((err, updatedHospital) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    description: 'Error updating hospital',
                    errors: err
                });
            }

            res.status(201).json({
                status: true,
                description: '...',
                hospital: updatedHospital,
                updated_by: req.user
            }); // EVERYTHING OK
        });
    });
});

/**
 * DELETE HOSPITAL BY ID
 */
app.delete('/:id', middlewareAuthenticaion.tokenVerification, (req, res, next) => {
    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (err, deletedHospital) => {
        if (err) {
            return res.status(500).json({
                status: false,
                description: 'Error deleting hospital',
                errors: err
            });
        }

        if (!deletedHospital) {
            return res.status(500).json({
                status: false,
                description: 'Hospital: ' + id + ' does not exist.',
                errors: { message: '...' }
            });
        }

        res.status(201).json({
            status: true,
            description: '...',
            hospital: deletedHospital,
            deleted_by: req.user
        }); // EVERYTHING OK

    });
});

module.exports = app; //EXPORTA FUERA DE ESTE ARCHIVO