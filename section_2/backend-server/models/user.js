var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var roles = {
    values: ['ADMIN_ROL', 'USER_ROL'],
    message: '{VALUE} no es un rol permitido'
};

var userSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido']
    },
    password: { type: String, required: [true, 'La contraseña es requerido'] },
    image: { type: String, required: false },
    rol: { type: String, required: true, default: 'USER_ROL', enum: roles },
    google: { type: Boolean, default: false }
});

userSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

module.exports = mongoose.model('User', userSchema);