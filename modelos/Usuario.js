const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  codigo: {type: String, require: true},
  email: {type: String, require: true},
  clave: {type: String, require: true},
  estado: {type: String, require: true},
  perfil: {type: String, require: true},
  nombre: {type: String, require: true},
  numeroErrores: {type: Number, require: true},
  fechaUltimoAcceso: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Usuario', usuarioSchema);