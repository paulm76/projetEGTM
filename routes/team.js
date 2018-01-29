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
<<<<<<< HEAD
      connection.query('SELECT id_joueur as id,Nom, Prenom, Places_prises FROM joueur_equipe INNER JOIN utilisateur ON joueur_equipe.id_joueur=utilisateur.id WHERE id_equipe=' + id , function (errUser,user){
=======
      console.log(id);
      connection.query('SELECT utilisateur.id, utilisateur.Nom, utilisateur.Prenom FROM utilisateur, (SELECT joueur_equipe.id_joueur FROM joueur_equipe WHERE joueur_equipe.id_equipe=' + id + ') as allIds WHERE utilisateur.id=allIds.id_joueur;', function (errUser,user){
>>>>>>> 2b8a18a7f118df432bfb174ecc44995c1683a49e
        if (!errUser){
          var userJSON = JSON.stringify(user);
          allRes.push(userJSON);
        } else {
          console.log(errUser);
        }
        var roomFind = findRoomName(teamJSON);
<<<<<<< HEAD
        connection.query('SELECT room.*, escape.Adresse, escape.Code_postal, escape.Ville, escape.Latitude, escape.Longitude FROM room INNER JOIN escape ON room.Etablissement=escape.Nom WHERE room.Nom=\'' + roomFind + '\';', function (errRoom,room){
          if (!errRoom){
=======
        connection.query('SELECT room.*, escape.Adresse, escape.Code_postal, escape.Ville, escape.Latitude, escape.Longitude, escape.Creuses_pleines, escape.Dates_speciales FROM room INNER JOIN escape ON room.Etablissement=escape.Nom WHERE room.Nom=\'' + roomFind + '\';', function (errRoom,room){
          if (!errRoom){  
>>>>>>> 2b8a18a7f118df432bfb174ecc44995c1683a49e
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

router.post('/append', function(req, res) {
  const{
    userid,
    teamid,
    places,
    prix,
    montantEscape,
    txId
  } = req.body;
  connection.query(`Select id from joueur_equipe WHERE txId=`+txId, function (err,result){
    if (result.length<1){
      connection.query(`INSERT INTO joueur_equipe (id_joueur, id_equipe, montantEscape, Places_prises, Prix, txId) VALUES(${userid}, ${teamid}, ${montantEscape} , ${places}, ${prix}, ${txId})`, function (err,result){
        if (!err){
          res.send(true)
          connection.query(`UPDATE equipe SET Nb_joueurs=Nb_joueurs+1 WHERE id=${teamid};`)
        } else {
          console.log(errUser);
        }
      })
    }
    else{
      res.send(false)
    }
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
