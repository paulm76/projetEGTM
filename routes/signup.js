var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var nodemailer = require("nodemailer");
//var xoauth2=require('xoauth2');

///hash and salt
var cryptPassword = function(password, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err)
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });
  });
};
/*
var comparePassword = function(plainPass, hashword, callback) {
   bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
       return err == null ?
           callback(null, isPasswordMatch) :
           callback(err);
   });
};*/

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
        //user: "aoshi_eirghez@gmail.com",
        //pass: "ubw051290dulac"
    }
});
var rand,mailOptions,host,link;*/
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

router.post('/',function(req, res) {
  console.log("testpost");
  var username="erreur username";
  username=req.body.username;
  var email="erreur email";
  email=req.body.email;
  var password="erreur password";
  console.log(username);
  console.log(email);
  password=req.body.password;
  console.log(password);
  var hashedPassword="nothashedyet";
  cryptPassword(password,function(err,hash){

    hashedPassword=hash;
    console.log("err:"+err);
    console.log("hash:"+hashedPassword);
  });
});
/////query
  //console.log(res.text());
  //connection.query('Insert into joueur_equipe(id_joueur,id_equipe) values (1,1)');//insert

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
 });
});*/
//do something with router

module.exports = router;
