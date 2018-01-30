var express = require('express');
var router = express.Router();

router.post('/',function(req, res,next) {
  console.log("ok");
  var titre="erreur prenom";
  titre=req.body.titre;
  var nb_joueurs_max=0;
  nb_joueurs_max=req.body.nb_joueurs_max;
  var date="erreur date";
  date=req.body.date;
  date=new Date(parseInt(date));
  //travailler la date pour avoir une date inserable dans mysql
  date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' +
    ('00' + date.getUTCHours()).slice(-2) + ':' +
    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
    ('00' + 0).slice(-2);
//console.log(date);
  //console.log(time.toString());
  var room="erreur room";
  //var country="erreur country";
  //password=req.body.password;
  //country=req.body.country;
  room=req.body.room;
  var nomReservation="erreur nom reservation";
  nomReservation=req.body.nomReservation;
  var emailReservation="erreur email reservation";
  emailReservation=req.body.emailReservation;
  /*------------------Query ------------------------*/
  /*var requete='Insert into utilisateur(Mot_de_passe,Nom,Prenom,Mail,Pays,Nationalité) values(';
  requete+='"'+
  password
  +'","'+nom+'","'+prenom+'","'+email+'","'+country+'","'+nationality+'")';

  query(connection,requete)
  .then(function()
  {
    res.send("ok");
  })
  .catch(next);*/
  console.log(titre);
  console.log(nb_joueurs_max);
  console.log(date);
  console.log(room);

});

module.exports = router;
