var express = require('express');
var router = express.Router();

router.post('/',function(req, res) {
  var email="erreur email";
  email=req.body.email;
  var password="erreur password";
  password=req.body.password;
  var requete="SELECT Mail FROM utilisateur where mail='"+email+"' AND Mot_de_passe='"+password+"'";
  connection.query(requete,function(err,result){
    if(err) throw err;
    console.log(result.length);
    if(result.length==0)
    {
      res.send(false);
    }
    else {
      res.send(true);
      //console.log("else");
    }
  });
})

/*router.use(function (err, req, res, next) {
  console.log(err);
});*/
module.exports = router;
