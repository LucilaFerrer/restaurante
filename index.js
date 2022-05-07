var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));

mongoose.connect('mongodb+srv://LucilaFerrer:Maracaibo@cluster0.6vk1c.mongodb.net/Restaurante?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/platos', require('./api/platos.js'));

app.listen(5000, function(){
  console.log("Servidor arriba en 5000...");
});
