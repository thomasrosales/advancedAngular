var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    email: { type: String, unique: true, required: [true, 'El email es requerido'] },
    password: { type: String, required: [true, 'La contraseña es requerido'] },
    image: { type: String },
    rol: { type: String, required: [true, 'El rol es requerido'], default: 'USER_ROL' }
});

module.exports = mongoose.model('User', userSchema);