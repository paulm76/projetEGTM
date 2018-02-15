var express = require('express');
var router = express.Router();

function query(connection, sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log(results);
      resolve(results);
    });
  });
}

router.get('/getroom',function(req,res,next)
{
  var requete="SELECT Nom FROM room";
  connection.query(requete,function(err,result){
    if(err) throw err;
    console.log(result);

    res.send(result);

  });
});

router.post('/',function(req, res,next) {
  /*------------------data ------------------------*/
  console.log("ok");
  var titre="erreur prenom";
  titre=req.body.titre;
  var nb_joueurs_actuel=0;
  nb_joueurs_actuel=req.body.nb_joueurs_actuel;
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
  var description="erreur description";
  description=req.body.description;

  var id_admin=0;
  //console.log("userid");
  id_admin=req.body.userid;
//console.log("userid2");

  console.log(titre);
  console.log(nb_joueurs_actuel);
  console.log(nb_joueurs_max);

  console.log(date);
  console.log(room);
  console.log(nomReservation);
  console.log(emailReservation);
  console.log(description);
  /*------------------Query ------------------------*/
  var requete='Insert into equipe(id_admin,Reservation,Mail_reservation,Titre,Description,Nb_joueurs,Nb_joueurs_max,Date,Room) values(';
  //active mis a 0 dans la database
  requete+='"'+
  id_admin
  +'","'+
  nomReservation
  +'","'+emailReservation+'","'+titre+'","'+description+'","'+nb_joueurs_actuel+'","'+nb_joueurs_max+'","'+date+'","'+room+'")';
  //il faut description et titre aussi a voir quand base de donnée a jour
  query(connection,requete)
  .then(function()
    {
      res.send("ok");
    })
    .catch(next);
  });

module.exports = router;
