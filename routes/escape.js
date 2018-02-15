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
  var escapeName = req.query.escape.replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ").replace('\'','\\\'');
  var allRes = [];
  connection.query('SELECT * FROM escape WHERE Nom=\'' + escapeName + '\';', function(escapeErr, escape){
  	if (!escapeErr){
      var escapeJSON = JSON.stringify(escape);
      console.log(escapeJSON);
      allRes.push(escapeJSON);
      connection.query('SELECT Nom, Difficulte, Theme, Nb_places_max, Nb_places_min FROM room WHERE Etablissement=\'' + escapeName + '\';', function(roomsErr,rooms){
        if(!roomsErr){
          var roomsJSON = JSON.stringify(rooms);
          allRes.push(roomsJSON);
          res.json(allRes);
        } else {
          console.log(roomsErr);
        }
      });
  	} else {
  	  console.log(escapeErr);
  	}
  });
  connection.on('error', function(err){
  	throw err;
  	return;
  });
});

module.exports = router;