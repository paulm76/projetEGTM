var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors');

var app = require('../app.js');
var conf = require('../mysql/conf.js');

/* GET home page. */
router.use(function(req, res, next){
  connection = mysql.createPool(conf);
  next();
});

router.use(cors());

router.get('/', function(req, res, next) {
  connection.query('SELECT equipe.id, equipe.Nb_joueurs, equipe.Date, room.*, escape.Ville, escape.Creuses_pleines, escape.Dates_speciales FROM equipe INNER JOIN room ON equipe.Room=room.Nom INNER JOIN escape ON room.Etablissement=escape.Nom WHERE equipe.Active=1 ORDER BY equipe.Date;', function(errTeam, teams){
  	if (!errTeam){
  	  var teamsJSON = JSON.stringify(teams);
  	  res.send(teamsJSON);
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