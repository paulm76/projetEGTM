import React, { Component } from 'react';
import { Input, Button, Grid, Checkbox, Icon, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Card from 'react-credit-cards';


class PaymentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: this.props.price,
      place: this.props.place,
      card:'',
      isSaving:true,
      loading:false,
      cagnotte:0,
     };

     this.handleChange = this.handleChange.bind(this);
     this.handleModifier = this.handleModifier.bind(this);
  }

  handleChange(event, prices, places, Nb_places_min){
    this.props.dataCallback(prices[event.label + this.props.team[0].Nb_joueurs - Nb_places_min],places[event.value])
  }

  handleModifier(event){
    this.props.paymentCallback(false,true);
  }

  componentDidMount() {
    const query = this.props.params;
    var headers = new Headers()
    var init = { method: 'GET', header: headers, mode: 'cors', cache: 'default' };
    fetch('http://localhost:3001/mangopay/getCard?userid=' + query.userid, init).then(blob => blob.json()).then(card =>  this.setState({ card: card.card, }))
    fetch('http://localhost:3001/mangopay/getCagnotte?userid=' + query.userid, init).then(blob => blob.json()).then(cagnotte =>  this.setState({ cagnotte: cagnotte, }))
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({loading:true})
    var isSaved=false
    if (this.state.card!==''){
      isSaved=true
    }
    const isSaving = this.state.isSaving
    this.props.paymentCallback(isSaved,isSaving);

  }

  componentWillReceiveProps(nextProps){
    this.setState({ price: nextProps.price, place: nextProps.place});
  }

  render() {

    const {
      prices,
      places,
      room,
      team,
    } =this.props;

    var realPrice;
    if (this.state.price == 0){
      realPrice = prices[team[0].Nb_joueurs - room[0].Nb_places_min + 1]; //a revoir
    } else {
      realPrice = this.state.price;
    }



    return (



      <form onSubmit={this.onSubmit} style={{padding:'20px',margin:'20px',minWidth:'400px'}}>

      <h1> {"Rejoindre l'équipe"} </h1>
      <h2>Votre réservation </h2>
      <Grid centered columns={2}>
        <Grid.Column >
          <Select id="placeSelect" value={this.state.place} onChange={ (event) => this.handleChange(event, prices, places, room[0].Nb_places_min) } options={places} clearable={false} style={{width:'120px', minWidth: '120px', display:'in-line'}} menuContainerStyle={{width:'120px'}} />places
        </Grid.Column>
        <Grid.Column>
          <b style={{'fontSize':'26px'}}>{Math.max(this.state.place.label*realPrice-parseInt(this.state.cagnotte),0)} €*</b>
          {this.state.place.label>1 &&  <span> soit {this.state.price} € par personnes</span> }
        </Grid.Column>
      </Grid><br/>

      {this.state.card==='' && <Checkbox onChange={(event)=>this.setState({isSaving:!this.state.isSaving})} checked={this.state.isSaving} label="Enregistrer mes données bancaires"/>}
      {this.state.card!=='' &&
      <div style={{width:'100%'}}>
      <h2>Vos coordonnées bancaires </h2>
      <Grid centered stackable columns={2}>
      <Grid.Column>
        <Card
         name=""
         cvc=""
         number ={this.state.card.Alias.replace(/X/g, "•")}
         expiry= {this.state.card.ExpirationDate}
         placeholders = {{'name':''}}
         issuer= 'visa'
         focused = 'number' />
         </Grid.Column>
         <Grid.Column>
         <Button animated onClick={this.handleModifier} floated='right'>
           <Button.Content hidden>
             <Icon name='setting' />
           </Button.Content>
           <Button.Content visible>Modifier</Button.Content>
         </Button>
         </Grid.Column>
         </Grid>
         </div>
       } <br/><br/>
       <p>*Votre cagnotte a été déduite de ce prix</p>
      <Button loading={this.state.loading} animated type='submit' floated='right'>
        <Button.Content visible>Payer</Button.Content>
        <Button.Content hidden>
          <Icon name='right arrow' />
        </Button.Content>
      </Button>
      </form>

    );
  }
}

export default PaymentPage;
