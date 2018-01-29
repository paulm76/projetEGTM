var express = require('express');
var router = express.Router();

router.post('/',function(req, res,next) {
  var titre="erreur prenom";
  titre=req.body.titre;
  var nb_joueurs_max=0;
  nb_joueurs_max=req.body.nb_joueurs_max;
  var date="erreur date";
  date=req.body.date;
  var room="erreur room";
  //var country="erreur country";
  //password=req.body.password;
  //country=req.body.country;
  room=req.body.room;
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
