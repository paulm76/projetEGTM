import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form';
import { Button, Card, List, Sticky, Grid, Image,Segment, Icon, Label, Message} from 'semantic-ui-react';
import _ from 'lodash';
import GoogleMapMarker from '../GoogleMapMarker'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import TeamMembers from '../TeamMembers';
import formatedDate from '../../scripts/formatedDate.js';
import PageNotFound from '../PageNotFound';

class Team extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: this.props.price,
      place: this.props.place,
      contextRef: '',
    };

    this.handleContextRef = this.handleContextRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleContextRef = contextRef => this.setState({ contextRef : contextRef })

  handleChange(event, prices, places, usersLen, Nb_places_min){
    this.props.dataCallback(prices[event.label + usersLen - Nb_places_min],places[event.value])
  }

  handleClick = () =>{
    this.props.join()
  }

  componentWillReceiveProps(nextProps){
    this.setState({ price: nextProps.price, place: nextProps.place});
  }

  render() {
    const {
      room,
      team,
      users,
      admin,
      prices,
      places,
      userid,
    } =this.props;
    if (!room || !team || !users || !admin || !prices || !places){
      return <PageNotFound />
    }

      const placesReserved = users.filter(user => user.id===userid).reduce((placesTotal,user)=>placesTotal+user.Places_prises,0)
      const usersLen = users.length;

	    var realPrice = this.state.price;

	    var linkToRoom = '/room?room=' + room[0].Nom.replace(" ","_");
	    var linkToEscape = '/escape?escape=' + room[0].Etablissement.replace(" ","_").replace(" ","_").replace(" ","_").replace(" ","_");

	    return (
	      <div >
	        <Grid centered columns={2} stackable>
	          <Grid.Column computer='8'>
	            <Segment vertical>
	              <h1>{team[0].Titre}</h1>
	              <h1><Link to={linkToRoom}>{room[0].Nom}</Link> </h1>
	              <h3><Link to={linkToEscape}>{room[0].Etablissement}</Link></h3>
	              <Icon name='marker' />{room[0].Adresse}, {room[0].Code_postal} {room[0].Ville} <br />
	              <Icon name='calendar' /> {formatedDate(team[0].Date)}
	            </Segment>

	            <Segment vertical>
	              <Grid centered columns={2}>
	                <Grid.Column>
	                  <span>Créée par {admin.Prenom}  {admin.Nom.substring(0,1)}. </span><br/>
	                  <span><Icon name='users' /> {team[0].Nb_joueurs}/{team[0].Nb_joueurs_max} membres </span><br/>
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
	                  <h2>{"A propos de l'équipe"}</h2>
	                  <p>{team[0].Description}</p>
	                </span>
	              }
	              <h2>A propos de la room</h2>
	              <p>{room[0].Description}</p>
	            </Segment>

	            <h2>Membres </h2>
	            <TeamMembers members={users} text ratio={1} idadmin={team[0].id_admin} libres={team[0].Nb_joueurs_max-team[0].Nb_joueurs} />
	            <h2>Localisation </h2>
	            <GoogleMapMarker
	              isMarkerShown
	              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAT5_dWgxyT9fFvqZKRP5zrV_WDknBQoYw&v=3.exp&libraries=geometry,drawing,places"
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
                      {placesReserved>0 && <Message>Vous avez déja réservé {placesReserved} places dans cette équipe</Message>}
	                  </Card.Content>
	                  <Button color='blue'attached='bottom' onClick={this.handleClick}> Rejoindre </Button>
	                </Card>
	              </Sticky>
	            </div>
	          </Grid.Column>

	        </Grid>
	      </div>
	    );
    }
  }

export default Team;
