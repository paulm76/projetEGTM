var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs')

router.post('/',function(req, res) {
  var email="erreur email";
  email=req.body.email;
  var password="erreur password";
  password=req.body.password;
  var requete="SELECT id, Nom, Prenom FROM utilisateur where Mail='"+email+"' AND Mot_de_passe='"+password+"'";
  console.log(requete)
  connection.query(requete,function(err,result){
    if(err) throw err;
    console.log(result)
    console.log(result.length);
    if(result.length==0)
    {
      res.send(false)
    }
    else {
      //var cert = fs.readFileSync('../privatekey.txt');  // get private key
      //console.log(cert)
      console.log('ok')
      var token = jwt.sign({'userid': result[0].id }, 'test');
      const response = {
        token:token,
        data:{
          id:result[0].id,
          nom:result[0].Nom,
          prenom:result[0].Prenom,
        }
      }
      connection.query("UPDATE utilisateur SET Date_derniere_connexion=NOW() WHERE id="+result[0].id)
      res.send(response);
      //console.log("else");
    }
  });
})

/*router.use(function (err, req, res, next) {
  console.log(err);
});*/
module.exports = router;
