var schedule = require('node-schedule');

const SettlePayment=(teamid)=>{
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

}

export const SchedulePayment=(teamid, date)=>{
  var date = new Date(date)
  var j = schedule.scheduleJob(date,SettlePayment(teamid))
}
