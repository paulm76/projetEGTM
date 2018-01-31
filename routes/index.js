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
})

router.use(cors());

router.get('/', function(req, res, next) {
  connection.query('SELECT equipe.id, equipe.Nb_joueurs, equipe.Date, room.*, escape.Ville, escape.Creuses_pleines, escape.Zone_scolaire, escape.Dates_spéciales FROM equipe INNER JOIN room ON equipe.Room=room.Nom INNER JOIN escape ON room.Etablissement=escape.Nom WHERE equipe.Active=1 ORDER BY equipe.Date;', function(errTeam, teams){
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

router.post('/updatePassword', function(req, res, next) {
  console.log(`SELECT id FROM utilisateur WHERE Mot_de_passe="${req.body.old}" && id=${req.body.id}`)
  connection.query(`SELECT id FROM utilisateur WHERE Mot_de_passe=${req.body.old}`, function(errVerif, Verif){
    console.log(Verif)
    if (Verif && Verif[0].id===req.body.id){
    connection.query(`UPDATE utilisateur SET Mot_de_passe=${req.body.new} WHERE id=${req.body.id}`, function(errAdd, add){
  	if (!errAdd){
    	  res.send({verif:true,added:true})
    	} else {
        res.send({verif:true,added:false})
    	  console.log(errTeam)
    	}
    })
  }
  else{
    res.send({verif:false,added:false})
  }
    connection.on('error', function(err){
    	throw err;
    	return;
    })
})
})



router.get('/getUser', function(req, res, next) {
  console.log(req.query.id)
      connection.query('SELECT id, Nom, Prenom,Mail, Date_inscription, Date_naissance, Nb_parties FROM utilisateur WHERE id='+req.query.id, function (errUser,user){
        if (!errUser){
          res.send(user[0])
        } else {
          console.log(errUser);
        }
      })
  connection.on('error', function(err){
  	throw err;
  	return;
  })
})


module.exports = router;
