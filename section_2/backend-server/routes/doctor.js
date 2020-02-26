var express = require('express');
var app = express();
var Doctor = require('../models/doctor');
var middlewareAuthenticaion = require('../middlewares/authentication');

/**
 * GET ALL HOSPITALS
 */
app.get('/', (req, res, next) => {

    var offset = req.query.offset || 0;
    offset = Number(offset);

    Doctor.find({})
        .skip(offset)
        .limit(5)
        .populate('user', 'nombre email')
        .populate('hospital')
        .exec((err, doctors) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    description: 'Error loading doctors.',
                    errors: err
                });
            }

            Doctor.count({}, (err, quantity) => {
                res.status(200).json({
                    status: true,
                    description: '...',
                    doctors: doctors,
                    total: quantity
                }); // EVERYTHING OK
            });


        }); //GET   
});

/**
 * CREATE DOCTOR
 */

app.post('/', middlewareAuthenticaion.tokenVerification, (req, res, next) => {

    var body = req.body;

    var doctor = new Doctor({
        nombre: body.nombre,
        image: body.image,
        user: body.user,
        hospital: body.hospital
    });

    doctor.save((err, persistentDoctor) => {

        if (err) {
            return res.status(400).json({
                status: false,
                description: 'Error creating doctor.',
                errors: err
            });
        }

        res.status(201).json({
            status: true,
            description: '...',
            doctor: persistentDoctor,
            create_by: req.user
        }); // EVERYTHING OK

    });
});

/**
 * UPDATE DOCTOR BY ID
 */
app.put('/:id', middlewareAuthenticaion.tokenVerification, (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    Doctor.findById(id, (err, persistentDoctor) => {
        if (err) {
            return res.status(500).json({
                status: false,
                description: 'Error getting doctor',
                errors: err
            });
        }

        if (!persistentDoctor) {
            return res.status(400).json({
                status: false,
                description: 'Doctor with id: ' + id + ' does not exist.',
                errors: { messages: '' }
            });
        }

        persistentDoctor.nombre = body.nombre;
        persistentDoctor.user = body.user;
        persistentDoctor.hospital = body.hospital;

        persistentDoctor.save((err, updatedDoctor) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    description: 'Error updating doctor',
                    errors: err
                });
            }

            res.status(201).json({
                status: true,
                description: '...',
                doctor: updatedDoctor,
                updated_by: req.user
            }); // EVERYTHING OK
        });
    });
});

/**
 * DELETE Docotr BY ID
 */
app.delete('/:id', middlewareAuthenticaion.tokenVerification, (req, res, next) => {
    var id = req.params.id;

    Doctor.findByIdAndRemove(id, (err, deletedDoctor) => {
        if (err) {
            return res.status(500).json({
                status: false,
                description: 'Error deleting doctor',
                errors: err
            });
        }

        if (!deletedDoctor) {
            return res.status(500).json({
                status: false,
                description: 'Doctor: ' + id + ' does not exist.',
                errors: { message: '...' }
            });
        }

        res.status(201).json({
            status: true,
            description: '...',
            doctor: deletedDoctor,
            deleted_by: req.user
        }); // EVERYTHING OK

    });
});

module.exports = app; //EXPORTA FUERA DE ESTE ARCHIVO