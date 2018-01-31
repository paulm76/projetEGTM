import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import {Link}  from 'react-router-dom';
import queryString from 'query-string';
import request from 'request';



class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      paymentValid:this.props.paymentValid,
    };
  }

  componentDidMount(){
    var transactionId;
    if (this.props.location){
    transactionId = queryString.parse(this.props.location.search).transactionId;
    }
    if (this.props.transactionId) {
      transactionId = this.props.transactionId
    }
    if (transactionId){
	  var headers = new Headers();
	  var init = { method: 'GET', header: headers, mode: 'cors', cache: 'default' };
	  fetch('http://localhost:3001/mangopay/getPayIn?id=' + transactionId, init).then(res => res.json())
    .then((transaction) => {
      console.log(transaction)
      if (transaction.ResultCode=='000000'){
      headers.append('Content-Type','application/x-www-form-urlencoded')
      const metadata = JSON.parse(transaction.Tag)
      const form ={
          'userid': metadata.userid,
          'teamid': metadata.teamid,
          'places': metadata.places,
          'prix': transaction.DebitedFunds.Amount/100,
          'montantEscape': metadata.montantEscape,
          'txId': transaction.Id
      };
      var options = { url:'http://localhost:3001/team/append' , header: headers, form:form };
      request.post(options,(err, httpResponse, body) =>{
        if (JSON.parse(body)===true){
          this.setState({ paymentValid: true})
        }
        else{
          this.setState({ paymentValid: false})
        }
      })
    }
    else {
      this.setState({ paymentValid: false})
    }
    })
    .catch(this.setState({ paymentValid: false}));
  }

  }

  render() {
    const paymentValid=this.state.paymentValid
    return(
      <div style={{padding:'20px',margin:'20px',minWidth:'400px'}}>
      { paymentValid===true &&
        <Message success>
        <Message.Header>Félicitations !</Message.Header>
        {"Vous faites maintenant parti de l'équipe :)"}
        </Message>
      }
      { !paymentValid===true &&
        <Message erreur>
        <Message.Header>Erreur</Message.Header>
        {"Un problème est survenu :("}
        </Message>
      }
        {!this.props.modal &&
        <Link to='/' > Retour à la page principale </Link>
      }</div>
  )
  }
}

export default TeamPage;
