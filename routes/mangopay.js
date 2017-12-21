var express = require('express');
var router = express.Router();
var cors = require('cors');

var app = require('../app.js');

var mangopay = require('mangopay2-nodejs-sdk');

var api = new mangopay({
    clientId: 'escapeteamup',
    clientPassword: 'escape&ESILV17',
});

router.use(function(req, res, next){

    next()
  });

router.use(cors());

router.get('/', function(req, res, next) {

  api.Users.create({
    "FirstName": "Victor",
    "LastName": "Hugo",
    "Address": "1 rue des Misérables, Paris",
    "Birthday": 1300186358,
    "Nationality": "FR",
    "CountryOfResidence": "FR",
    "Occupation": "Writer",
    "IncomeRange": "6",
    "ProofOfIdentity": null,
    "ProofOfAddress": null,
    "PersonType": "NATURAL",
    "Email": "victor@hugo.com",
    "Tag": "custom tag",
  }).then(function(model){
        res.send('ok')
        console.log(model)
    });
});


module.exports = router;
