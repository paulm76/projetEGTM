var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var nodemailer = require("nodemailer");
var cors=require("cors");
//var xoauth2=require('xoauth2');
//var mysql = require('promise-mysql');


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

/// email
/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/
/*
var smtpTransport = nodemailer.createTransport({
debug:true,
service: "Gmail",
auth: {
XOAuth2: {
user: "aoshieirghez@gmail.com",
clientId: "248136951432-9h3vku9r6ap9086mugn0qgqp928dfnbp.apps.googleusercontent.com",
clientSecret: "fB7-2kuHPGqg8dkNaViJGNR6",
refreshToken: "1/rCFO9lCd-acoT1sTBu3Nu2ht9f_g9tGsHihn-JeHHy8"
}

}
});
var rand,mailOptions,host,link;*/
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
//router.use(cors());
router.get('/isMailInDatabase',function(req,res,next)
{
  var email='';
  email=req.query.email;
  var requete="SELECT Mail FROM utilisateur where mail=";
  requete+='"'+email+'"';
  //SELECT Mail FROM egtmbd.utilisateur where Mail="aoshi_eirghez@hotmail.fr"
  console.log(requete);
  connection.query(requete,function(err,result){
    /*console.log(data);
    if(data==null)
    {
      console.log("null");
    }*/
    if(err) throw err;
    console.log(result.length);
    if(result.length==0)
    {
      res.send(false);
    }
    else {
      res.send(true);
      console.log("else");
    }
    /*if(data.length>0){
      res.send(true);

    }
    else {
      res.send(false);
    }*/
  });
});

router.post('/',function(req, res,next) {
  //console.log("testpost");
  var prenom="erreur prenom";
  prenom=req.body.prenom;
  var nom="erreur nom";
  nom=req.body.nom;
  var email="erreur email";
  email=req.body.email;
  var password="erreur password";
  var country="erreur country";
  //console.log(prenom);
  //console.log(nom);
  //console.log(email);
  //hash things are done client side
  password=req.body.password;
  //console.log(password);
  country=req.body.country;
  //console.log(country);
  nationality=req.body.nationality;
  //console.log(nationality);

  /////query


  //console.log(res.text());
  //var requete='Insert into joueur_equipe(id_joueur,id_equipe) values(1,1)'
  var requete='Insert into utilisateur(Mot_de_passe,Nom,Prenom,Mail,Pays,Nationalité) values(';
  requete+='"'+
  password
  +'","'+nom+'","'+prenom+'","'+email+'","'+country+'","'+nationality+'")';
  console.log(requete);

  /*connection.query(requete,function(){
  res.end();
})*/
query(connection,requete)
.then(function()
{
  res.send("ok");
})
.catch(next);




/*.then(function(data){
res.setHeader('Content-type', "application/x-www-form-urlencoded; charset=UTF-8");
//res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
//res.setHeader("Access-Control-Allow-Origin", "*");
//res.setHeader("Access-Control-Allow-Credentials", "true");
//res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
console.log(res.end(data));
})*/
//.catch(next);
//{
//res.status(500,{error:err});
//console.log("next")
//});
//res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
//res.setHeader("Access-Control-Allow-Origin", "*");
//res.setHeader("Access-Control-Allow-Credentials", "true");
//res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//  console.log("query");
//console.log(results);
//res.statusCode=200;
//  console.log(res.send("ok"));

});

router.use(function (err, req, res, next) {
  // handle error
  //console.log(connection);
  console.log(err);
});
//next();

//insert
/*
var requete='Insert into utilisateur(id,Mot_de_passe,Nom,Prenom,Mail,Numero,Adresse,Code_postal,Ville,Date_inscription,Date_derniere_connexion,Date_naissance,Actif) values('
requete+='"5","'+hashedPassword+'","nomtest","prenomtest",""'+email+'","1","adressetest","11111","villetest","2018-01-08 00:00:00","2018-01-08 00:00:00","1992-01-04","0")'
console.log(requete);
connection.query(requete);
*/
/////mail
//rand=Math.floor((Math.random() * 100) + 54);
//host=req.get('host');
//link="http://"+req.get('host')+"/verify?id="+rand;
/*
link="emptylink";
mailOptions={
from:"aoshieirghez@gmail.com",
to : email,
subject : "Please confirm your Email account",
html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
}
console.log(mailOptions);
smtpTransport.sendMail(mailOptions, function(error, response){
if(error){
console.log(error);
res.end("error");
}else{
console.log("Message sent: " + response.message);
res.end("sent");
}
});*/
//});
//do something with router

module.exports = router;
