var express = require('express');
var router = express.Router();
var cors = require('cors');
var mysql = require('mysql');
var cors = require('cors');

var mangopay = require('mangopay2-nodejs-sdk');

var api = new mangopay({
    clientId: 'escapeteamup',
    clientPassword: '1r4TmX1jonJBRAuXcdyyqPfvQ1KK7Kscb1OH7iubSkhCfxnYtZ',
});

router.use(function(req, res, next){
  connection = mysql.createPool(conf);
  next();
});
router.use(cors());


router.get('/', function(req, res, next) {
  console.log(req.query)
});

router.post('/createUser', function(req, res, next) {
  const email=req.body.email;
  connection.query('SELECT id, Mail, Nom, Prenom,Pays, Nationalité,Date_naissance  FROM utilisateur WHERE Mail=?', [email], function (errUser,user){
    if (!errUser && user.length==1){
      const date = user[0].Date_naissance.setHours(2)
      const birthday = parseInt(date.toString().slice(0,-3))
        const myUser = {
          "FirstName": user[0].Prenom,
          "LastName": user[0].Nom,
          "Birthday": birthday,
          "Nationality": user[0].Nationalité,
          "CountryOfResidence":user[0].Pays,
          "PersonType": "NATURAL",
          "Email": user[0].Mail,
      };
      api.Users.create(myUser).then(function(model){
        console.log(model)
        const myWallet={
        "Owners": [ model.Id ],
        "Description": "Cagnotte",
        "Currency": "EUR"
        }

        api.Wallets.create(myWallet).then(function(wallet){
            console.log({'userid':wallet.Owners[0], 'walletid':wallet.Id})
                connection.query('UPDATE utilisateur SET UserID=?,WalletID=? WHERE id = ?', [wallet.Owners[0],wallet.Id,user[0].id], function (error){
                  if (!error){
                    res.send('Done');
                  }
                });
              });
      });
    }
     else {
        console.log(errUser);
      }
    });
  connection.on('error', function(err){
  throw err;
  return;
  });
});


router.post('/createLegalUser', function(req, res, next) {
  var myUser = new api.models.UserLegal({
    Name: req.body.societe,
    Email:req.body.mail,
    LegalPersonType: 'BUSINESS',
    LegalRepresentativeFirstName: req.body.prenom,
    LegalRepresentativeLastName: req.body.nom,
    LegalRepresentativeBirthday: parseInt((new Date(req.body.birthday)).setHours(2).toString().slice(0,-3)),
    LegalRepresentativeNationality: req.body.nationalite,
    LegalRepresentativeCountryOfResidence: req.body.pays
});

console.log(myUser)

    api.Users.create(myUser).then(function(model){
        console.log(model)
        const myWallet={
        "Owners": [ model.Id ],
        "Description": "A Reverser à l'escape game",
        "Currency": "EUR"
        }

        api.Wallets.create(myWallet).then(function(wallet){
          console.log(`UPDATE escape SET MangoPayID=${wallet.Owners[0]},WalletID=${wallet.Id} WHERE Nom=${req.body.escape}`)
                connection.query(`UPDATE escape SET MangoPayID=${wallet.Owners[0]},WalletID=${wallet.Id} WHERE Nom="${req.body.escape}"`, function (error){
                  if (!error){
                    res.send('Done');
                  }
                });
              });
      });
  connection.on('error', function(err){
  throw err;
  return;
  });
});

router.get('/getId', function(req, res, next) {
  const userid=req.query.id;
  connection.query('SELECT UserID as mangopayId  FROM utilisateur WHERE id=?', [userid], function (errUser,user){
    if (!errUser && user.length==1){
        res.send(user[0].mangopayId)
      } else {
        console.log(errUser);
      }
    });
  connection.on('error', function(err){
  throw err;
  return;
  });
});

router.get('/getWalletId', function(req, res, next) {
  const userid=req.query.id;
  connection.query('SELECT WalletID as walletId  FROM utilisateur WHERE id=?', [userid], function (errUser,user){
    if (!errUser && user.length==1){
        res.send(user[0].walletId)
      }
     else {
        console.log(errUser);
      }
    });
  connection.on('error', function(err){
  throw err;
  return;
  });
});

router.get('/getWalletBalance', function(req, res, next) {
  const userid=req.query.id;
  connection.query('SELECT WalletID as walletId  FROM utilisateur WHERE id=?', [userid], function (errUser,user){
    if (!errUser && user.length==1){
        api.Wallets.get(user[0].walletId).then( wallet => res.send(wallet.Balance.Amount) )
      }
     else {
        console.log(errUser);
      }
    });
  connection.on('error', function(err){
  throw err;
  return;
  });
});

router.get('/getCagnotte', function(req, res, next) {
  const userid=req.query.userid;
  connection.query('SELECT Cagnotte FROM utilisateur WHERE id='+userid, function (errUser,user){
    if (!errUser && user.length==1){
        res.send(user[0].Cagnotte.toString())
      }
     else {
       res.send("0")
        console.log(errUser);
      }
    });
  connection.on('error', function(err){
  throw err;
  return;
  });
});

router.get('/getCard', function(req, res, next) {
  const userid=req.query.userid;
  connection.query('SELECT CardID as cardId  FROM utilisateur WHERE id=?', [userid], function (errUser,user){
    console.log(user)
    if (!errUser && user.length===1 && user!==null && user.CardID!==null){
        api.Cards.get(user[0].cardId).then( card => res.send({'statut':200, 'card':card}) )
      }
     else {
       res.send({'statut':300, 'card':''})
        console.log(errUser);
      }
    });
  connection.on('error', function(err){
  throw err;
  return;
  });
});

router.get('/getPayIn', function(req, res, next) {
  const id=req.query.id;
  api.PayIns.get(id).then( tx => {
    console.log(tx)
    res.send(tx)
  })
});

router.get('/getBankAccount', function(req, res, next) {
  const userid=req.query.userid;
  connection.query('SELECT UserID, BankAccountID, Cagnotte FROM utilisateur WHERE id=?', [userid], function (errUser,user){
    console.log(user)
    if (!errUser && user.length===1 && user!==null){
        api.Users.getBankAccount(user[0].UserID,user[0].BankAccountID)
        .then( bankAccount => res.send({'statut':200, 'bankAccount':bankAccount, 'cagnotte':user[0].Cagnotte}) )
        .catch((error)=>{
          console.log(error)
          res.send({'statut':301, 'bankAccount':''})
        })
      }
     else {
       res.send({'statut':300, 'bankAccount':''})
        console.log(errUser);
      }
    });
  connection.on('error', function(err){
  throw err;
  return;
  });
});

router.get('/createCardRegistration', function(req, res, next) {
  const userid=req.query.id;
  connection.query('SELECT UserID as mangopayId  FROM utilisateur WHERE id='+ userid, function (errUser,user){
    if (!errUser && user.length==1){
      api.CardRegistrations.create({"UserId": user[0].mangopayId, "Currency": "EUR"}).then(function(cardRegistration){
        res.send(cardRegistration)
      });
    }
     else {
        console.log(errUser);
      }
    });
  connection.on('error', function(err){
  throw err;
  return;
  });
});

router.get('/updateCardRegistration', function(req, res, next) {
  const registrationID=req.query.id;
  const userid=req.query.userid;
  api.CardRegistrations.get(registrationID).then(function(cardRegistration){
    cardRegistration.RegistrationData= req.query.token;
    console.log(cardRegistration)
    api.CardRegistrations.update({"Id":registrationID, "RegistrationData": req.query.token}).then(function(cardReg){
      connection.query(`UPDATE utilisateur SET CardID=${cardReg.CardId} WHERE id = ${userid}`, function (error){
        if (!error){
          res.send(cardReg.CardId)
        }
      });
    })
  });
});

router.post('/createBankAccount', function(req, res, next) {
  const userid=req.body.userid;
  console.log(req.body)
  const OwnerAddress = {
    "AddressLine1":req.body.AddressLine1,
    "AddressLine2":req.body.AddressLine2,
    "City":req.body.City,
    "Region":req.body.Region,
    "PostalCode":req.body.PostalCode,
    "Country":req.body.Country
  }
  console.log(OwnerAddress)
  const iban= req.body.iban
  connection.query('SELECT Nom, Prenom, UserID as mangopayId FROM utilisateur WHERE id=?', [userid], function (errUser,user){
    if (!errUser && user.length==1){
      api.Users.createBankAccount(user[0].mangopayId,{
        "OwnerAddress": OwnerAddress,
        "OwnerName": user[0].Prenom+" "+user[0].Nom,
        "IBAN": iban,
        "Type": "IBAN"
      }).then(function(bankAccount){
        connection.query('UPDATE utilisateur SET BankAccountID=? WHERE id = ?', [bankAccount.Id,userid], function (error){
          if (!error){
            res.send(bankAccount)
          }
        });
      })
      .catch((error)=>{
        console.log(error)
        res.send(error)
      })

    }
     else {
        console.log(errUser);
      }
    });
  connection.on('error', function(err){
  throw err;
  return;
  });
});

router.get('/createPayOut', function(req, res, next) {
  const userid=req.query.userid;
  connection.query('SELECT UserID as mangopayId, WalletID, BankAccountID, Cagnotte  FROM utilisateur WHERE id=?', [userid], function (errUser,user){
    if (!errUser && user.length==1){
      console.log(user[0])
      api.PayOuts.create({
        "AuthorId": user[0].mangopayId,
        "DebitedFunds": {
        "Currency": "EUR",
        "Amount": user[0].Cagnotte*100
        },
        "Fees": {
        "Currency": "EUR",
        "Amount": 0
        },
        "BankAccountId": user[0].BankAccountID,
        "DebitedWalletId": user[0].WalletID,
        "PaymentType": "BANK_WIRE"
      }).then(function(payOut){
        if (payOut.Statut!=="FAILED"){
          connection.query('UPDATE utilisateur SET Cagnotte=0 WHERE id='+userid);
        }
        res.send(payOut)
      });
    }
     else {
        console.log(errUser);
      }
    });
  connection.on('error', function(err){
  throw err;
  return;
  });
});

router.post('/createPayIn', function(req, res, next) {
  console.log(req.body)
  const userid=req.body.userid;
  const prix=req.body.prix;
  const teamid =req.body.teamid;
  const places = req.body.places;
  const montantEscape = req.body.amountEscape
  connection.query('SELECT UserID as mangopayId, WalletID as walledId, CardID as cardId, Cagnotte  FROM utilisateur WHERE id='+ userid, function (errUser,user){
    if (!errUser && user.length==1){
      var paidPrice=prix;
      if(user[0].Cagnotte>0){
        var paidPrice=Math.max(prix-user[0].Cagnotte,0)
        connection.query(`UPDATE utilisateur SET Cagnotte=${Math.max(0,user[0].Cagnotte-prix)} WHERE id=`+userid)
      }
      if (paidPrice>0){
        api.PayIns.create({
          "Tag":`{"userid":${userid},"teamid":${teamid},"places":${places},"montantEscape":${montantEscape},"prix":${prix}}`,
          "AuthorId": user[0].mangopayId,
          "CreditedWalletId": user[0].walledId,
          "DebitedFunds": {
          "Currency": "EUR",
          "Amount": paidPrice*100,
          },
          "Fees": {
          "Currency": "EUR",
          "Amount": 0,
          },
          "PaymentType": "CARD",
          "ExecutionType": "DIRECT",
          "CardId": user[0].cardId,
          "SecureModeReturnURL": "http://localhost:3000/paymentdone"
          }
        ).then(function(payIn){
                  res.send(payIn)
                });
              }
              else{
                connection.query(`INSERT INTO joueur_equipe (id_joueur, id_equipe, montantEscape, Places_prises, Prix) VALUES(${userid}, ${teamid}, ${montantEscape} , ${places}, ${prix})`, function (err,result){
                  if (!err){
                    connection.query(`UPDATE equipe SET Nb_joueurs=Nb_joueurs+1 WHERE id=${teamid};`)
                    res.send({Status:'SUCCEEDED'})
                  } else {
                    console.log(errUser);
                  }
                })

              }
          }
             else {
                console.log(errUser);
              }
            });

          connection.on('error', function(err){
          throw err;
          return;
          });
});

router.post('/createWebPayIn', function(req, res, next) {
  const userid=req.body.userid;
  const prix=req.body.prix;
  const teamid =req.body.teamid;
  const places = req.body.places;
  const montantEscape = req.body.amountEscape
  connection.query('SELECT UserID as mangopayId, WalletID as walledId, Cagnotte FROM utilisateur WHERE id='+ userid, function (errUser,user){
    if (!errUser && user.length==1){
      var paidPrice=prix;
      if(user[0].Cagnotte>0){
        var paidPrice=Math.max(prix-user[0].Cagnotte,0)
        connection.query(`UPDATE utilisateur SET Cagnotte=${Math.max(0,user[0].Cagnotte-prix)} WHERE id=`+userid)
      }
      if (paidPrice>0){
        api.PayIns.create({
          "Tag":`{"userid":${userid},"teamid":${teamid},"places":${places},"montantEscape":${montantEscape},"prix":${prix}}`,
          "AuthorId": user[0].mangopayId,
          "CreditedWalletId": user[0].walledId,
          "DebitedFunds": {
          "Currency": "EUR",
          "Amount": paidPrice*100,
          },
          "Fees": {
          "Currency": "EUR",
          "Amount": 0,
          },
          "CardType": "CB_VISA_MASTERCARD",
          "PaymentType": "CARD",
          "ExecutionType": "WEB",
          "Culture": "FR",
          "ReturnURL": "http://localhost:3000/paymentdone"
          }
        ).then(function(payIn){
          console.log(payIn)
                  res.send(payIn)
                });
              }
              else{
                connection.query(`INSERT INTO joueur_equipe (id_joueur, id_equipe, montantEscape, Places_prises, Prix) VALUES(${userid}, ${teamid}, ${montantEscape} , ${places}, ${prix})`, function (err,result){
                  if (!err){
                    connection.query(`UPDATE equipe SET Nb_joueurs=Nb_joueurs+1 WHERE id=${teamid};`)
                    res.send({PaidWithCagnotte:true})
                  } else {
                    console.log(errUser);
                  }
                });
              }
            }
             else {
                console.log(errUser);
              }
            });
          connection.on('error', function(err){
          throw err;
          return;
          });
});

router.get('/settleTransfers', function(req, res, next) {
  const teamid=req.query.teamid;
  connection.query('SELECT  room.Etablissement, equipe.id_admin  FROM room INNER JOIN equipe ON room.Nom=equipe.Room WHERE equipe.id=?', [teamid], function (errTeam,team){
    connection.query('SELECT  *  FROM joueur_equipe WHERE id_equipe=?', [teamid], function (errMembers,members){
      connection.query('SELECT  UserID as mangopayId, WalledID as walledId  FROM utilisateur WHERE id=?', [team[0].id_admin], function (errCreator,creator){
      members.map(function(member){
        connection.query('SELECT  UserID as mangopayId, WalledID as walledId  FROM utilisateur WHERE id=?', [member.id_joueur], function (errUser,user){
          connection.query('SELECT  MangoPayID as mangopayId, WalledID as walledId ,Commission  FROM escape WHERE Nom=?', [team[0].Etablissement], function (errEscape,escape){
          if (!errUser && user.length==1 && !errEscape && escape.length==1 && member.Prix){
            if (member.montantEscape > 0){
              api.Transfers.create({
                "AuthorId":  user[0].mangopayId,
                "DebitedFunds": {
                "Currency": "EUR",
                "Amount": member.montantEscape*100
                },
                "Fees": {
                "Currency": "EUR",
                "Amount": member.montantEscape*escape[0].Commission*100
                },
                "DebitedWalletId": user[0].walletId,
                "CreditedWalletId": escape[0].walledId
                }
              )
            }
              connection.query(`UPDATE utilisateur SET Cagnotte=Cagnotte+${(member.Prix/member.Places_prises-members[members.length-1].payed/members[members.length-1].Places_prises)*member.Places_prises} WHERE id = ${member.id_joueur}`)
              api.Transfers.create({
                "AuthorId":  user[0].mangopayId,
                "DebitedFunds": {
                "Currency": "EUR",
                "Amount": (members[members.length-1].payed/members[members.length-1].Places_prises -member.montantEscape)*100
                },
                "Fees": {
                "Currency": "EUR",
                "Amount": 0
                },
                "DebitedWalletId": user[0].walletId,
                "CreditedWalletId": creator.walledId
              });
            }
          });

        });
      });
    });
  });
});
          connection.on('error', function(err){
          throw err;
          return;
          });
});


module.exports = router;
