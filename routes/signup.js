var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var nodemailer = require("nodemailer");
var cors=require("cors");

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


/*------------------Routing Started ------------------------*/
router.get('/isMailInDatabase',function(req,res,next)
{
  var email='';
  email=req.query.email;
  var requete="SELECT Mail FROM utilisateur where mail=";
  requete+='"'+email+'"';
  console.log(requete);
  connection.query(requete,function(err,result){
    if(err) throw err;

    if(result.length==0)
    {
      res.send(false);
    }
    else {
      res.send(true);

    }
  });
});

router.post('/',function(req, res,next) {
  var prenom="erreur prenom";
  prenom=req.body.prenom;
  var nom="erreur nom";
  nom=req.body.nom;
  var email="erreur email";
  email=req.body.email;
  var password="erreur password";
  var country="erreur country";
  password=req.body.password;
  country=req.body.country;
  nationality=req.body.nationality;
  /*------------------Query ------------------------*/
  var requete='Insert into utilisateur(Mot_de_passe,Nom,Prenom,Mail,Pays,Nationalité) values(';
  requete+='"'+
  password
  +'","'+nom+'","'+prenom+'","'+email+'","'+country+'","'+nationality+'")';

  query(connection,requete)
  .then(function()
  {
    res.send("ok");
  })
  .catch(next);
});

router.use(function (err, req, res, next) {
  console.log(err);
});
module.exports = router;
