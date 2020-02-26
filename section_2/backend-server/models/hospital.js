var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var hospitalSchema = new Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre es requerido'] },
    image: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false }
});

hospitalSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

module.exports = mongoose.model('Hospital', hospitalSchema);