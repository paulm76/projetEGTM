import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mysql from 'mysql';
import Form from '../Form';
import { Button, Card, List, Sticky, Grid, Image,Segment, Icon, Label} from 'semantic-ui-react';
import _ from 'lodash';
import GoogleMapMarker from '../GoogleMapMarker';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import findPrice from '../../scripts/findPrice.js';
import formatePictureName from '../../scripts/formatePictureName.js';

class TeamPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      escapeInfo: [],
      contextRef: '',
    };

    this.handleContextRef = this.handleContextRef.bind(this);
  }

  handleContextRef = contextRef => this.setState({ contextRef : contextRef })

  componentWillMount() {
  	var query = this.props.location.search
  	var escape = query.substring(8, query.length);
	var headers = new Headers();
	var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
	fetch('http://localhost:3001/escape?escape=' + escape, init).then(res => res.json()).then(escapeInfo => this.setState({ escapeInfo: escapeInfo, }));
  }

  render() {
  	const contextRef = this.state.contextRef;
  	if (this.state.escapeInfo && this.state.escapeInfo!="" && this.state.escapeInfo!="null"){
	    
	    var escape = JSON.parse(this.state.escapeInfo[0]);
	    var rooms = JSON.parse(this.state.escapeInfo[1]);
      var roomLen = rooms.length;
      for (var i=0; i<roomLen; i++){
        rooms[i].Photo = formatePictureName(escape[0].Nom, rooms[i].Nom)
        rooms[i].Path = "/room?room=" + rooms[i].Nom.replace(' ','_').replace(' ','_').replace(' ','_').replace(' ','_');
      }
      
      var imagePathEscape = formatePictureName(escape[0].Nom, escape[0].Nom);

	    return (
	      <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
	      	<Grid centered columns={2} stackable>
        	  <Grid.Column computer='8'>
    			<Segment vertical>
    	  		<h1>{escape[0].Nom}</h1>
    	  		<Icon name='marker' />{escape[0].Adresse}, {escape[0].Code_postal} {escape[0].Ville}
    			</Segment>
    		
    			<Segment vertical>
  		  	  <h2>Liste des rooms</h2>
    			  <List style={{ display: 'flex', flexWrap: 'wrap' }}>
    		  		{rooms.map(room => 
    		  		  <Link to={`${room.Path}`}><List.Item key={room.Nom} style={{ marginRight: '20px', paddingLeft: '20px', backgroundImage: "url('" + room.Photo + "')", backgroundSize: '270px 120px', backgroundRepeat: 'no-repeat', color:'white', width: '270px', height: '120px', fontWeight: 'bold', textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black' }}>
    		  		  	<h3>{room.Nom}</h3>
    		  		  	<p>{room.Theme}<br/>
    		  		  	  {room.Difficulte}<br/>
    		  		  	  De {room.Nb_places_min} à {room.Nb_places_max} joueurs
    		  		  	</p> 
    		  		  </List.Item></Link>
              )}
    			  </List>
    			</Segment>
    			<h2>Localisation </h2>
    			<GoogleMapMarker
          	  	  isMarkerShown
          	  	  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBYzbUIeVSGKMU0-KCJYWD1_X4qC_OsrI&v=3.exp&libraries=geometry,drawing,places"
          	  	  loadingElement={<div style={{ height: `100%` }} />}
          	  	  containerElement={<div style={{ height: `400px` }} />}
          	  	  mapElement={<div style={{ height: `100%` }} />}
          	  	  position = {{lat: escape[0].Latitude, lng: escape[0].Longitude}}
    			/>
	      	  </Grid.Column>
	          <Grid.Column computer='5'>
	            <Image src={ imagePathEscape }/>
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
