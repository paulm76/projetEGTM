var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors');

var app = require('../app.js');
var conf = require('../mysql/conf.js');


router.use(function(req, res, next){
  connection = mysql.createPool(conf);
  next();
});

router.use(cors());

router.get('/', function(req, res, next) {
      connection.query('SELECT utilisateur.id, utilisateur.Nom, utilisateur.Prenom, utilisateur.Mail, utilisateur.Date_inscription, utilisateur.Date_naissance, utilisateur.Nb_parties FROM utilisateur;', function (errUser,user){
        if (!errUser){
          var userJSON = JSON.stringify(user);
          console.log(userJSON);
          res.send(userJSON)
        } else {
          console.log(errUser);
        }
      });
  connection.on('error', function(err){
  	throw err;
  	return;
  });
});



module.exports = router;
