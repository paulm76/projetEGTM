import React from 'react';
import { Link } from 'react-router-dom';
import mysql from 'mysql';
import Form from '../Form';
import { Button, Card, List, Sticky, Grid, Image,Segment, Icon, Label} from 'semantic-ui-react';
import _ from 'lodash';
import GoogleMapMarker from '../GoogleMapMarker'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class RoomPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	roomInfo: [],
        contextRef: '',
    };

    this.handleContextRef = this.handleContextRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  handleContextRef = contextRef => this.setState({ contextRef : contextRef })

  handleChange = function(event){

  }

  setDate(date){
  	var days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
  	var months = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
  	var year = date.substring(0,4);
  	var yearInt = parseInt(year);
  	var month = date.substring(5,7);
  	var monthInt = parseInt(month);
  	var day = date.substring(8,10);
  	var dayInt = parseInt(day);
  	var hour = date.substring(11,13);
  	var minute = date.substring(14,16);
  	var dayNumber = (dayInt+yearInt+Math.trunc(yearInt/4)-Math.trunc(yearInt/100)+Math.trunc(yearInt/400)+Math.trunc((31*monthInt)/12))%7;
	return days[dayNumber] + ' ' + day + ' ' + months[month-1] + ' ' + year + ' à ' + hour + ':' + minute;
  }

  componentDidMount() {
    var query = this.props.location.search
  	var room = query.substring(6, query.length);
	var headers = new Headers();
	var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
	fetch('http://localhost:3001/room?room=' + room, init).then(res => res.json()).then(roomInfo => this.setState({ roomInfo: roomInfo, }));
  }

  render() {
    const { contextRef } = this.state.contextRef;
   	if (this.state.roomInfo && this.state.roomInfo!="" && this.state.roomInfo!="null"){

	    var room = JSON.parse(this.state.roomInfo[0]);
	    var escape = JSON.parse(this.state.roomInfo[1]);
	    var teams = JSON.parse(this.state.roomInfo[2]);

	    return (
	      <div >
	      	<Grid centered columns={2} stackable>
        	  <Grid.Column computer='8'>
          		<Segment vertical>
            	  <h1>{room[0].Nom}</h1> <h3>{escape[0].Nom}</h3>
            	  <Icon name='marker' />{escape[0].Adresse}, {escape[0].Code_postal} {escape[0].Ville}
          		</Segment>

          		<Segment vertical>
            	  <Grid centered columns={2}>
              		<Grid.Column>
                	  <span><Icon name='hashtag' /> <Label>{room[0].Theme} </Label></span>
              		</Grid.Column>
              		<Grid.Column>
                	  <span><Icon name='chain' /> Difficulté : {room[0].Difficulte} </span><br/>
              		</Grid.Column>
            	  </Grid>
          		</Segment>
          		
          		<Segment vertical>
          		  <h2>A propos de la room</h2>
          		  <p>{room[0].Description}</p>
          		</Segment>
          		<h2 style={{ marginBottom: '20px' }}>Equipe en cours </h2>
				{teams.map(team => <List.Item key={team.id}> <Link to={`/team?teamId=${team.id}`}><h3>{team.Titre}</h3></Link> <Icon name='calendar' /> {this.setDate(team.Date)} </List.Item>)}
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
          		<div ref={this.handleContextRef}>
            	  <Sticky context={contextRef} >
            		<Card fluid>
              		  <Image src={room[0].Photo}/>
              		  <Button color='blue'attached='bottom'> Reserver </Button>
            		</Card>
            	  </Sticky>
            	</div>
          	  </Grid.Column>
      		</Grid>
	      </div>
	    );

	} else {
		return (<p></p>);
	}
  }
}

export default RoomPage;