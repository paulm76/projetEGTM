var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors');

var app = require('../app.js');

/* GET home page. */
router.use(function(req, res, next){
  connection = mysql.createPool({host: '127.0.0.1', user: 'admin', password: 'pwd',	database: 'egtmbd'});
  next();
});

router.use(cors());

router.get('/', function(req, res, next) {
  connection.query('SELECT equipe.id, equipe.Nb_joueur, equipe.Date, equipe.Room, room.Photo, room.Nb_places_max FROM equipe INNER JOIN room ON equipe.Room=room.Nom ORDER BY equipe.Date;', function(errTeam, teams){
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
