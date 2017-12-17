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


const TeamView = ({
  teamInfo,
}) => {
  if (teamInfo && teamInfo!="" && teamInfo!="null"){
    var team = JSON.parse(teamInfo[0]);
    var users = JSON.parse(teamInfo[1]);
    var room = JSON.parse(teamInfo[2]);
    var admin;
    var usersLen = users.length;
    for (var i=0; i<usersLen; i++){
      if (users[i].id == team[0].id_admin){
        admin = users[i];
      }
    }
    var prices = findPrice(team[0].Date, room[0].Tarif_creux, room[0].Tarif_plein, room[0].Creuses_pleines, room[0].Dates_speciales);
    var price = prices[0];
    var places = []
    for (var i=0; i<room[0].Nb_places_max - team[0].Nb_joueur; i++){
      places.push({value: i, label: i + 1});
    }

    var place;

    function handleChange(event){
      price = prices[event.value + usersLen];
      place = places[event.value]
      console.log(event.value);
      console.log(place);
    }

    return (
      <div >
        <Grid centered columns={2} stackable>
          <Grid.Column computer='8'>
            <Segment vertical>
              <h1>{team[0].Titre}</h1>
              <Link to={room[0].Nom}><h1>{room[0].Nom}</h1></Link> <h3>{room[0].escape}</h3>
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
            <List>
              {users.map(member => <List.Item key={member.id}> {member.Prenom}  {member.Nom.substring(0,1)}.</List.Item>)}
            </List>
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
              <Sticky>
                <Card fluid>
                  <Image src={room[0].Photo}/>
                  <Card.Content>
                    <Grid centered columns={2}>
                      <Grid.Column >
                        <Select id="placeSelect" value={place} onChange={handleChange} options={places} clearable={false} style={{width:'120px', minWidth: '120px', display:'in-line'}} menuContainerStyle={{width:'42px'}} />places
                      </Grid.Column>
                      <Grid.Column>
                        <b style={{'fontSize':'26px'}}>{place*price} €</b>
                        {place>1 &&  <span> soit {price} € par personnes</span> }
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


class SimpleTeamPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamInfo: props.teamInfo,
      prix:{
        1:null,
        2:'50',
        3:'35',
        4:'30',
        5:'25',
        6:'23',
        7:'20',
        8:'18'
      },
      members:[{
        Id:'1',
        Nom:'Jean',
        Prenom:'Jean',
        avatar:'https://i.ytimg.com/vi/fUWrhetZh9M/maxresdefault.jpg'
      },
      {
        Id:'2',
        Nom:'Matin',
        Prenom:'Martin',
        avatar:'http://www.stickpng.com/assets/images/580b57fbd9996e24bc43be54.png'
      }],
      contextRef: '',
      nplace:'1',
      price:'35',
      data:{
        Nom:'La fine équipe',
        Description:'Bonjour',
        Theme:'Prison',
        Difficulte:'Difficile',
        id_admin:'1',
        Date:'20:00 12/12/2012',
        Nb_joueur_max:8,
        Nb_joueur:2,
        Adresse:'13 Rue Beccaria',
        Ville: 'Paris',
        Code_postal: '75012',
        Latitude:48.847390,
        Longitude: 2.378877,
        'room.Id':'1',
        'room.Nom':'Prison Break',
        'room.Description':"Mais qu'est ce que vous avez fait encore ??? Comment vous en êtes arrivé là ??? Mais vous n'êtes pas possible ! Vous voilà tout les deux enterrés 6 pieds sous terre entre 4 planches, chacun dans son propre cercueil... et aucune aide à attendre de l’extérieur ! Mais bon sang, qui vous avez provoqué ? Qui avez-vous vexé ???? Bon, on fait le point. Vous avez quoi qui pourrait vous aider... à part ce qu'il y a dans vos poches, on voit pas. Avec une heure à peine d’oxygène dans le cercueil.... va falloir faire vite. Vite. Très vite ! On disait que la communication était le coeur de l'aventure ? Ca semble inévitable dans votre cas !",
        Photo:'https://escapeshaker.com/img/eg-room/paris-destination-danger-objectif-mars.jpg',
        'escape.Nom':'Team Breaker Paris la Defense',
      }

    };

    this.handleContextRef = this.handleContextRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleContextRef = contextRef => this.setState({ contextRef : contextRef })

  handleChange = function(event){
    this.setState({
      nplace:event.value,
      price:this.state.prix[this.state.data.Nb_joueur+event.value]
    });
  }

  componentWillMount(){
    console.log('Will : ' + this.state.teamInfo);
  }

  componentDidMount(){
    console.log('Did : ' + this.state.teamInfo);
  }

  render() {
    const data = this.state.data;
    const creator = this.state.members.find(member=> member.Id==data.id_admin);
    const places = [];
    for (var i = 1; i < data.Nb_joueur_max-data.Nb_joueur+1; i++){
      places.push({value:i,label:i})
    };
    return (
      <p>toto</p>
    );
  }
}

export default TeamView;