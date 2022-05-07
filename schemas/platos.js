var mongoose = require('mongoose');

var platoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String,
  ingredientes: [{nombre: String}],
  precio: Number
});

module.exports = mongoose.model('Plato', platoSchema, 'Platos');