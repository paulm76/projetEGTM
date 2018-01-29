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
  var roomName = req.query.room.replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ");
  var allRes = [];
  connection.query('SELECT * FROM room WHERE Nom=\'' + roomName + '\';', function(errRoom, room){
  	if (!errRoom){
      var roomJSON = JSON.stringify(room);
      allRes.push(roomJSON);
      var escapeName = findEscapeName(roomJSON);
      console.log(escapeName);
      connection.query('SELECT * FROM escape WHERE Nom=\'' + escapeName + '\';', function(errEscape, escape){
        if (!errEscape){
          var escapeJSON = JSON.stringify(escape);
          allRes.push(escapeJSON);
          connection.query('SELECT * FROM equipe WHERE Room=\'' + roomName + '\' ORDER BY date;', function(errTeams, teams){
            if (!errTeams){
              var teamsJSON = JSON.stringify(teams);
              allRes.push(teamsJSON);
              res.json(allRes);
            } else {
              console.log(errTeams);
            }
          });
        } else {
          console.log(errEscape);
        }
      });
  	} else {
  	  console.log(errRoom);
  	}
  });
  connection.on('error', function(err){
  	throw err;
  	return;
  });
});

function findEscapeName(room){
  console.log(room);
  var escapeRegex = /Etablissement/g;
  var firstIndex = escapeRegex.exec(room).index + 16;
  var quoteRegex = /\"/g;
  quoteRegex.lastIndex = firstIndex;
  var lastIndex = quoteRegex.exec(room).index;
  return room.substring(firstIndex,lastIndex);
}

module.exports = router;