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
  var id = req.query.teamId;
  var allRes = [];
  connection.query('SELECT * from equipe WHERE id=' + id, function(errTeam, team){
  	if (!errTeam){
      var teamJSON = JSON.stringify(team);
      allRes.push(teamJSON);
      connection.query('SELECT utilisateur.id, utilisateur.Nom, utilisateur.Prenom FROM utilisateur, (SELECT joueur_equipe.id_joueur FROM joueur_equipe WHERE id_equipe=' + id + ') as allIds WHERE utilisateur.id=allIds.id_joueur;', function (errUser,user){
        if (!errUser){
          var userJSON = JSON.stringify(user);
          allRes.push(userJSON);
        } else {
          console.log(errUser);
        }
        var roomFind = findRoomName(teamJSON);
        connection.query('SELECT room.*, escape.Adresse, escape.Code_postal, escape.Ville, escape.Latitude, escape.Longitude FROM room INNER JOIN escape ON room.Escape_game=escape.Nom WHERE room.Nom=\'' + roomFind + '\';', function (errRoom,room){
          if (!errRoom){  
            var roomJSON = JSON.stringify(room);
            allRes.push(roomJSON);
            res.json(allRes);
          } else {
            console.log(errRoom);
          }
        });
      });
  	} else {
  	  console.log(errTeam);
  	}
  });
  connection.on('error', function(err){
  	throw err;
  	return;
  });
});

function findRoomName(team){
  var roomRegex = /Room/g;
  var firstIndex = roomRegex.exec(team).index + 7;
  var quoteRegex = /\"/g;
  quoteRegex.lastIndex = firstIndex;
  var lastIndex = quoteRegex.exec(team).index;
  return team.substring(firstIndex,lastIndex);
}

module.exports = router;