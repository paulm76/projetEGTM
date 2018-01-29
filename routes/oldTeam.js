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
  connection.query('SELECT equipe.*, escape.*, utilisateur.Nom as adminLastName, utilisateur.Prenom as adminFirstName FROM equipe INNER JOIN room ON equipe.Room=room.Nom INNER JOIN escape ON room.Etablissement=escape.Nom INNER JOIN utilisateur ON equipe.id_admin=utilisateur.id WHERE equipe.Active=2 ORDER BY equipe.Date;', function (errTeam,team){
    if (!errTeam){
      var teamJSON = JSON.stringify(team);
      res.send(teamJSON);
    } else {
      console.log(errTeam);
    }
  });
  connection.on('error', function(err){
  	throw err;
  	return;
  });
});



module.exports = router;
