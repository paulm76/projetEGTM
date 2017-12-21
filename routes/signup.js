var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

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

  //console.log(res.text());
  //connection.query('Insert into joueur_equipe(id_joueur,id_equipe) values (1,1)');//insert
});
//do something with router

module.exports = router;
