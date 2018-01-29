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

router.get('/createUser', function(req, res, next) {
  const userid=req.query.id;

  connection.query('SELECT Mail, Nom, Prenom  FROM utilisateur WHERE id=?', [userid], function (errUser,user){
    if (!errUser && user.length==1){
        const myUser = {
          "FirstName": user[0].Prenom,
          "LastName": user[0].Nom,
          "Birthday": 1300186358,
          "Nationality": "FR",
          "CountryOfResidence": "FR",
          "PersonType": "NATURAL",
          "Email": user[0].Mail,
      };
      api.Users.create(myUser).then(function(model){
        const myWallet={
        "Owners": [ model.Id ],
        "Description": "Cagnotte",
        "Currency": "EUR"
        }

        api.Wallets.create(myWallet).then(function(wallet){
            console.log({'userid':wallet.Owners[0], 'walletid':wallet.Id})
                connection.query('UPDATE utilisateur SET UserID=?,WalletID=? WHERE id = ?', [wallet.Owners[0],wallet.Id,userid], function (error){
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

router.get('/getCard', function(req, res, next) {
  const userid=req.query.userid;
  connection.query('SELECT CardID as cardId  FROM utilisateur WHERE id=?', [userid], function (errUser,user){
    console.log(user)
    if (!errUser && user.length===1 && user!==null){
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
        "Amount": user[0].Cagnotte
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
  connection.query('SELECT UserID as mangopayId, WalletID as walledId, CardID as cardId  FROM utilisateur WHERE id='+ userid, function (errUser,user){
    if (!errUser && user.length==1){
      console.log(user[0])
        api.PayIns.create({
          "Tag":`{"userid":${userid},"teamid":${teamid},"places":${places},"montantEscape":${montantEscape}}`,
          "AuthorId": user[0].mangopayId,
          "CreditedWalletId": user[0].walledId,
          "DebitedFunds": {
          "Currency": "EUR",
          "Amount": prix*100,
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
  connection.query('SELECT UserID as mangopayId, WalletID as walledId FROM utilisateur WHERE id='+ userid, function (errUser,user){
    if (!errUser && user.length==1){
        api.PayIns.create({
          "Tag":`{"userid":${userid},"teamid":${teamid},"places":${places},"montantEscape":${montantEscape}}`,
          "AuthorId": user[0].mangopayId,
          "CreditedWalletId": user[0].walledId,
          "DebitedFunds": {
          "Currency": "EUR",
          "Amount": prix*100,
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
  connection.query('SELECT  room.*  FROM room INNER JOIN equipe ON room.id=equipe.room_id WHERE equipe.id=?', [teamid], function (errRoom,room){
    connection.query('SELECT  *  FROM joueur_equipe WHERE teamid=?', [teamid], function (errMembers,members){
      connection.query('SELECT  UserID as mangopayId, WalledID as walledId  FROM utilisateur WHERE id=?', [members[0].userid], function (errCreator,creator){
      members.map(function(member){
        if (members.indexOf(member)!==0){
        connection.query('SELECT  UserID as mangopayId, WalledID as walledId  FROM utilisateur WHERE id=?', [member.userid], function (errUser,user){
          connection.query('SELECT  UserID as mangopayId, WalledID as walledId ,commission  FROM escape WHERE id=?', [room[0].escapeId], function (errEscape,escape){
          if (!errUser && user.length==1 && !errEscape && escape.length==1){
              api.Transfers.create({
                "AuthorId":  user[0].mangopayId,
                "DebitedFunds": {
                "Currency": "EUR",
                "Amount": member.montantEscape
                },
                "Fees": {
                "Currency": "EUR",
                "Amount": member.montantEscape*escape[0].Commission
                },
                "DebitedWalletId": user[0].walletId,
                "CreditedWalletId": escape[0].walledId
                }
              )
              connection.query('UPDATE utilisateur SET Cagnotte=Cagnotte+? WHERE id = ?', [member.payed-members[members.length-1].payed,member.userid])
              api.Transfers.create({
                "AuthorId":  user[0].mangopayId,
                "DebitedFunds": {
                "Currency": "EUR",
                "Amount": members[members.length-1].payed -"amount"
                },
                "DebitedWalletId": user[0].walletId,
                "CreditedWalletId": creator.walledId
                }
              )
            }
          });
        });
        }
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
