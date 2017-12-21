var express = require('express');
var router = express.Router();

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

  //console.log(res.text());
  //connection.query('Insert into joueur_equipe(id_joueur,id_equipe) values (1,1)');//insert
});
//do something with router

module.exports = router;
