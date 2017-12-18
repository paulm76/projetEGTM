import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mysql from 'mysql';
import Form from '../Form';
import { Button, Card, List, Sticky, Grid, Image,Segment, Icon, Label} from 'semantic-ui-react';
import _ from 'lodash';
import GoogleMapMarker from '../GoogleMapMarker'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import findPrice from '../../scripts/findPrice.js'
import TeamMembers from '../TeamMembers'

class TeamPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamInfo: [],
      price: 0,
      place: { value: 0, label: 1 },
      contextRef: '',
    };

    this.handleContextRef = this.handleContextRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleContextRef = contextRef => this.setState({ contextRef : contextRef })

  handleChange(event, prices, places, usersLen, Nb_places_min){
    this.setState({ price: prices[event.label + usersLen - Nb_places_min] });
    this.setState({ place: places[event.value] });
  }

  componentWillMount() {
  	var query = this.props.location.search
  	var id = query.substring(8, query.length);
	var headers = new Headers();
	var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
	fetch('http://localhost:3001/team?teamId=' + id, init).then(res => res.json()).then(teamInfo => this.setState({ teamInfo: teamInfo, }));
  }

  render() {
  	if (this.state.teamInfo && this.state.teamInfo!="" && this.state.teamInfo!="null"){
	    var team = JSON.parse(this.state.teamInfo[0]);
	    var users = JSON.parse(this.state.teamInfo[1]);
	    var room = JSON.parse(this.state.teamInfo[2]);
	    var admin;
	    var usersLen = users.length;
	    for (var i=0; i<usersLen; i++){
	      if (users[i].id == team[0].id_admin){
	        admin = users[i];
	      }
	    }
	    var prices = findPrice(team[0].Date, room[0].Tarif_creux, room[0].Tarif_plein, room[0].Creuses_pleines, room[0].Dates_speciales);
	    prices = prices.split(',');
	    var places = []
	    for (var i=0; i<room[0].Nb_places_max - team[0].Nb_joueur; i++){
	      places.push({value: i, label: i + 1});
	    }

	    var realPrice; 
	    if (this.state.price == 0){
	    	realPrice = prices[usersLen - room[0].Nb_places_min + 1]; //a revoir
	    } else {
	    	realPrice = this.state.price;
	    }

	    var linkToRoom = '/room?room=' + room[0].Nom.replace(" ","_");

	    return (
	      <div >
	        <Grid centered columns={2} stackable>
	          <Grid.Column computer='8'>
	            <Segment vertical>
	              <h1>{team[0].Titre}</h1>
	              <Link to={linkToRoom}><h1>{room[0].Nom}</h1></Link> <h3>{room[0].Escape_game}</h3>
	              <Icon name='marker' />{room[0].Adresse}, {room[0].Code_postal} {room[0].Ville}
	              &nbsp;&nbsp;<Icon name='calendar' /> {team[0].Date}
	            </Segment>

	            <Segment vertical>
	              <Grid centered columns={2}>
	                <Grid.Column>
	                  <span>Créée par {admin.Prenom}  {admin.Nom.substring(0,1)}. </span><br/>
	                  <span><Icon name='users' /> {team[0].Nb_joueur}/{room[0].Nb_places_max} membres </span><br/>
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
	            <TeamMembers members={users} text ratio={1} idadmin={team[0].id_admin} libres={room[0].Nb_places_max-team[0].Nb_joueur} />
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
  	} else {
    	return <p></p>
  	}
  }
}

export default TeamPage;