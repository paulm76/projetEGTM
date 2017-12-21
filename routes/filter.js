var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors');

var app = require('../app.js');
var conf = require('../mysql/conf.js');

/* GET home page. */
router.use(function(req, res, next){
  connection = mysql.createPool(conf);
  next();
});

router.use(cors());

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM escape ;', function(escapeErr, escape){
  	if (!escapeErr){
      console.log(escape);
  	} else {
  	  console.log(escapeErr);
  	}
  });
  connection.on('error', function(err){
  	throw err;
  	return;
  });
});

module.exports = router;