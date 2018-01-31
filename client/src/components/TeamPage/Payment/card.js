import React, { Component } from 'react';
import { Input, Button, Grid, Icon, Image,Message } from 'semantic-ui-react';
import styled from 'styled-components';
import queryString from 'query-string';
import request from 'request';
import Payment from 'payment';
import Card from 'react-credit-cards';


import Form from '../../Form';


const INITIAL_STATE = {
  CardRegistrationData: {},
  CardNumber: '',
  CardExpirationDate:'',
  CardCvx:'',
  error: false,
  focused:'number',
  loading:false,
};

class CardPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    var headers = new Headers();
    var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
    fetch('http://localhost:3001/mangopay/createCardRegistration?id=' + this.props.userid, init).then(res => res.json()).then(cardReg => this.setState({ CardRegistrationData: cardReg }));
    Payment.formatCardNumber(document.querySelector('[name="number"]'));
    Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
    Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
  }

  onSubmit = (event) => {
    const paymentCallback = this.props.paymentCallback;
    const {
      CardRegistrationData,
      CardNumber,
      CardExpirationDate,
      CardCvx,
    } = this.state;
    event.preventDefault()
    this.setState({error:false,loading:true})
    const date = Payment.fns.cardExpiryVal(CardExpirationDate)
    var parsedDate = '';
    if (date.month < 10){ parsedDate +='0'}
    parsedDate += date.month.toString() + date.year.toString().substr(date.year.toString().length-2)
    var headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded')
    headers.append('Authorization','')
    var options = {
            url: CardRegistrationData.CardRegistrationURL,
            headers: headers,
            form: {
                'data': CardRegistrationData.PreregistrationData,
                'accessKeyRef': CardRegistrationData.AccessKey,
                'cardNumber': CardNumber.replace(' ','').replace(' ','').replace(' ',''),
                'cardExpirationDate': parsedDate,
                'cardCvx': CardCvx
            }
        };
        request.post(options,(err, httpResponse, body) =>{
          CardRegistrationData.RegistrationData = body;
          if (body.substr(0,5)==='error'){
            this.setState({error:true,loading:false})
          }
          else{
          var headers = new Headers();
          var init = { method: 'GET', header: headers, mode: 'cors', cache: 'default' };
          fetch('http://localhost:3001/mangopay/updateCardRegistration?userid=' +this.props.userid + '&id='+ CardRegistrationData.Id +'&token='+ CardRegistrationData.RegistrationData, init)
          .then(() =>paymentCallback(true,false))
          .catch((error)=>{
            console.log(error)
            this.setState({error:true,loading:false})
          })
        }
      });

  }

  render() {
    const {
      CardNumber,
      CardExpirationDate,
      CardCvx,
      error,
    } = this.state;

    const isInvalid =
      CardNumber === '' ||
      CardExpirationDate === '' ||
      CardCvx === '';

    return (
      <form onSubmit={this.onSubmit} style={{padding:'20px',margin:'20px',minWidth:'600px'}}>
      <h1>Veuillez saisir vos données bancaires* </h1>
      <Grid centered stackable columns={2}>
        <Grid.Column style={{padding:'46px'}} >
      <Card
       name=''
       number ={CardNumber}
       cvc = {CardCvx}
       expiry= {CardExpirationDate.replace(' ','').replace(' ','')}
       placeholders = {{'name':''}}
       issuer= 'visa'
       focused = {this.state.focused} />
       </Grid.Column >
       <Grid.Column  style={{padding:'46px'}}>
       <Grid.Row centered>
        <Input style={{padding:'4px'}}
          name="number"
          value={CardNumber}
          onChange={event => this.setState({ CardNumber: event.target.value, focused: event.target.name })}
          type="text"
          placeholder="N° de carte"
        />
        </Grid.Row>
        <Grid.Row centered>
        <Input style={{padding:'4px'}}
          name="expiry"
          value={CardExpirationDate}
          onChange={event => this.setState({ CardExpirationDate: event.target.value, focused: event.target.name })}
          type="text"
          placeholder="Date d'expiration"
        />
        </Grid.Row>
        <Grid.Row centered>
        <Input style={{padding:'4px'}}
        name="cvc"
          value={CardCvx}
          onChange={event => this.setState({ CardCvx: event.target.value, focused: event.target.name })}
          type="text"
          placeholder="Cryptogramme"
        />
        </Grid.Row>
        <Grid.Row centered >
        <Button color='blue' loading={this.state.loading} disabled={isInvalid} type="submit">
          Envoyer
        </Button>
        </Grid.Row>
        </Grid.Column >
        </Grid>

        {error && <Message error>Une erreur s'est produite durant l'enregistrement de vos données bancaires</Message>}
        *Vos données bancaires seront enregistrées par notre service de paiement.
        <Image src="https://www.mangopay.com/terms/powered-by-mangopay.png"/>
      </form>
    );
  }
}

export default CardPage;
