import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import Team from './team.js';
import PageNotFound from '../PageNotFound';
import findPrice from '../../scripts/findPrice.js';
<<<<<<< HEAD
import PaymentPage from './Payment'
import Card from './Payment/card.js'
import Modal from 'react-responsive-modal';
import queryString from 'query-string';
import PaymentValid from '../PaymentValid';
import request from 'request';
import { sessionService } from 'redux-react-session';
=======
import TeamMembers from '../TeamMembers';
import formatedDate from '../../scripts/formatedDate.js';
import formatePictureName from '../../scripts/formatePictureName.js';
>>>>>>> 2b8a18a7f118df432bfb174ecc44995c1683a49e

class TeamPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamInfo: [],
      price: 0,
      place: { value: 0, label: 1 },
      isLoading:true,
      open: false,
      paystep:0,
      paymentValid:false,
      prices:'',
      places:'',
      team:'',
      users:'',
      room:'',
      payInId:'',
      userid:'',
      authenticated:false,
    };

  }

  componentDidMount() {
    console.log(this.props)
  	var query = this.props.location.search
  	var id = query.substring(8, query.length);
	var headers = new Headers();
	var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
	fetch('http://localhost:3001/team?teamId=' + id, init).then(res => res.json())
  .then((teamInfo) => {
    var team = JSON.parse(teamInfo[0]);
    var users = JSON.parse(teamInfo[1]);
    var room = JSON.parse(teamInfo[2]);
    var prices = findPrice(team[0].Date, room[0].Tarif_creux, room[0].Tarif_plein, room[0].Creuses_pleines, room[0].Dates_speciales);
    prices = prices.split(',');
    var places = []
    for (var i=0; i<room[0].Nb_places_max - team[0].Nb_joueurs; i++){
      	 places.push({value: i, label: i + 1});
    }
    this.setState({teamInfo: teamInfo, isLoading:false ,prices:prices, places:places, team:team, users:users, room:room,price:prices[team[0].Nb_joueurs-room[0].Nb_places_min+1]})
  })
  sessionService.loadUser().then(user=>this.setState({userid:user.id, authenticated:true}))
  }

  show = () => {
    const history = this.props.history;
    if(!this.state.authenticated){
      history.push('./signin')
    }
      this.setState({ open: true, })
    }

  callbackTeam = (price,place) => { this.setState({ 'price':price, 'place':place})}

  callbackPay =  (isSaved, isSaving) => {

    const {
      prices,
      team
    } = this.state
    const userid=this.state.userid;
    const history=this.props.history;
    const amountEscape=prices[team[0].Nb_joueurs+this.state.place.label]*(team[0].Nb_joueurs+this.state.place.label)-prices[team[0].Nb_joueurs]*team[0].Nb_joueurs;

    var headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded')
    const form = {
      "userid":userid,
      "teamid":this.state.team[0].id,
      "amountEscape":amountEscape,
      "prix":this.state.price*this.state.place.label,
      "places":this.state.place.label
    }
    if (isSaved){
      var options = { url:'http://localhost:3001/mangopay/createPayIn' , header: headers, form:form };
      request.post(options,(err, httpResponse, body) => {
        const res = JSON.parse(body);
          if (res.SecureModeNeeded){
            window.location.replace(res.SecureModeRedirectURL)
          }
          else{
          if(res.Status==='SUCCEEDED'){
            this.setState({ 'paystep':2, paymentValid:true, payInId: res.Id})
          }
          else{
            this.setState({ 'paystep':2, paymentValid:false})
          }
        }
      });
    }
    else{
      if (isSaving){
        this.setState({ 'paystep':1,});
      }
      else{
        var options = { url:'http://localhost:3001/mangopay/createWebPayIn' , header: headers, form:form };
        request.post(options,(err, httpResponse, body) => {
          const res = JSON.parse(body);
            window.location.replace(res.RedirectURL)
        });
      }
    }
  }

  close = () => this.setState({ open: false, 'paystep':0 })

  render() {
    const {
      prices,
      places,
      room,
      users,
      team
    } = this.state

    const { open } = this.state;
    if (this.state.isLoading){
      return <Loader />
    }
  	if (this.state.teamInfo && this.state.teamInfo!="" && this.state.teamInfo!="null"){
	    var admin;
	    var usersLen = users.length;
	    for (var i=0; i<usersLen; i++){
	      if (users[i].id == team[0].id_admin){
	        admin = users[i];
	      }
	    }
<<<<<<< HEAD
	    return (
	      <div >
	        <Team room={room} userid={this.state.userid} users={users} team={team} admin={admin} prices={prices} places={places} history={this.props.history} join={this.show} dataCallback={this.callbackTeam} place={this.state.place} price={this.state.price}/>
          <Modal open={open} onClose={this.close} little>
            {this.state.paystep===0 && <PaymentPage history={this.props.history} place={this.state.place} price={this.state.price} params={{teamid:team[0].id, userid: this.state.userid}} history={this.props.history} paymentCallback={this.callbackPay} dataCallback={this.callbackTeam} prices={prices} places={places} room={room} usersLen={usersLen}/>}
            {this.state.paystep===1 && <Card price={this.state.price*this.state.place.label} userid={this.state.userid} paymentCallback={this.callbackPay}/>}
            {this.state.paystep===2 && <PaymentValid modal paymentValid={this.state.paymentValid} transactionId={this.state.payInId}/>}

          </Modal>
         </div>
	    );
=======

	    room[0].Photo = formatePictureName(room[0].Etablissement, room[0].Nom);

	    var prices = findPrice(team[0].Date, room[0].Tarif_creux, room[0].Tarif_plein, room[0].Creuses_pleines, room[0].Dates_speciales);
	    prices = prices.split(',');
	    var places = []
	    for (var i=0; i<room[0].Nb_places_max - team[0].Nb_joueurs; i++){
	      places.push({value: i, label: i + 1});
	    }

	    var realPrice; 
	    if (this.state.price == 0){
	    	realPrice = prices[usersLen - room[0].Nb_places_min + 1];
	    } else {
	    	realPrice = this.state.price;
	    }

	    var linkToRoom = '/room?room=' + room[0].Nom.replace(" ","_").replace(" ","_").replace(" ","_").replace(" ","_").replace(" ","_");
	    var linkToEscape = '/escape?escape=' + room[0].Etablissement.replace(" ","_").replace(" ","_").replace(" ","_").replace(" ","_");

	    return (
	      <div >
	        <Grid centered columns={2} stackable>
	          <Grid.Column computer='8'>
	            <Segment vertical>
	              <h1>{team[0].Titre}</h1>
	              <h1><Link to={linkToRoom}>{room[0].Nom}</Link></h1>
	              <h3><Link to={linkToEscape}>{room[0].Etablissement}</Link></h3>
	              <Icon name='marker' />{room[0].Adresse}, {room[0].Code_postal} {room[0].Ville} <br />
	              <Icon name='calendar' /> {formatedDate(team[0].Date)}
	            </Segment>

	            <Segment vertical>
	              <Grid centered columns={2}>
	                <Grid.Column>
	                  <span>Créée par {admin.Prenom}  {admin.Nom.substring(0,1)}. </span><br/>
	                  <span><Icon name='users' /> {team[0].Nb_joueurs}/{room[0].Nb_places_max} membres </span><br/>
	                  <span><Icon name='hashtag' /> <Label>{room[0].Theme} </Label></span>
	                </Grid.Column>
	                <Grid.Column>
	                  <span><Icon name='chain' /> Difficulté : {room[0].Difficulte} </span><br/>
	                </Grid.Column>
	              </Grid>
	            </Segment>

	            <Segment vertical>
	              {(team[0].Description!='' && team[0].Description) &&
	                <span>
	                  <h2>A propos de l'équipe</h2>
	                  <p>{team[0].Description}</p>
	                </span>
	              }
	              <h2>A propos de la room</h2>
	              <p>{room[0].Description}</p>
	            </Segment>

	            <h2>Membres </h2>
	            <TeamMembers members={users} text ratio={1} idadmin={team[0].id_admin} libres={room[0].Nb_places_max-team[0].Nb_joueurs} />
	            <h2>Localisation </h2>
	            <GoogleMapMarker
	              isMarkerShown
	              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3UwriB5wrf_yUtBtIAfLvxrLVoxBYuII&v=3.exp&libraries=geometry,drawing,places"
	              loadingElement={<div style={{ height: `100%` }} />}
	              containerElement={<div style={{ height: `400px` }} />}
	              mapElement={<div style={{ height: `100%` }} />}
	              position = {{lat: room[0].Latitude, lng: room[0].Longitude}}
	            />
	          </Grid.Column>

	          <Grid.Column computer='5'>
	            <div ref={this.handleContextRef}>
	              <Sticky context={this.state.contextRef}>
	                <Card fluid>
	                  <Image src={room[0].Photo}/>
	                  <Card.Content>
	                    <Grid centered columns={2}>
	                      <Grid.Column >
	                        <Select id="placeSelect" value={this.state.place} onChange={ (event) => this.handleChange(event, prices, places, usersLen, room[0].Nb_places_min) } options={places} clearable={false} style={{width:'120px', minWidth: '120px', display:'in-line'}} menuContainerStyle={{width:'120px'}} />places
	                      </Grid.Column>
	                      <Grid.Column>
	                        <b style={{'fontSize':'26px'}}>{this.state.place.label*realPrice} €</b>
	                        {this.state.place.label>1 &&  <span> soit {this.state.price} € par personnes</span> }
	                      </Grid.Column>
	                    </Grid>
	                  </Card.Content>
	                  <Button color='blue'attached='bottom'> Rejoindre </Button>
	                </Card>
	              </Sticky>
	            </div>
	          </Grid.Column>

	        </Grid>
	      </div>
	    ); 
>>>>>>> 2b8a18a7f118df432bfb174ecc44995c1683a49e
  	} else {
    	return <PageNotFound />
  	}
  }
}

export default TeamPage;
