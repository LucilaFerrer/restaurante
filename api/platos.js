var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Plato = require('../schemas/platos.js');

router.get('/', function(req, res) {
  Plato.find().exec()
    .then(
      function(result) {
        res.json(result);
      }
    );
});

router.post('/buscar', function(req, res) {
  var idPlato = req.body.idPlato;
  Plato.findById(idPlato).exec()
    .then(
      function(result) {
        res.json(result);
      }
    );
});

router.post('/actualizar', function(req, res) {
  var nombre = req.body.nombre;
  var edad = req.body.edad;
  // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
  Plato.findOneAndUpdate({nombre: nombre}, {$set:{precio:precio}}, {useFindAndModify: false, new: true}, function (err, doc) {
    res.json(doc);
  });
});

router.post('/insertar', function(req, res) {

  var platoNuevo = new Plato({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.plato,
    ingredientes: req.body.ingredientes,
    precio: req.body.precio
  });

  platoNuevo.save()
    .then(
      function(result) {
        res.json(result);
      }
    );
});

module.exports = router;
