import React from 'react';
import { Link } from 'react-router-dom';
import mysql from 'mysql';
import Form from '../Form';
import { Button, Card, List, Sticky, Grid, Image,Segment, Icon, Label} from 'semantic-ui-react';
import _ from 'lodash';
import GoogleMapMarker from '../GoogleMapMarker'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const TeamPage = (props, context) => {
  //if context.userid==props.teamid {return <MemberTeamPage /> }
  //else
  return <SimpleTeamPage teamid={props.teamid} />
}


class SimpleTeamPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        contextRef :'',
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
        teams:[{
            Id:'1',
            Nom:'La fine equipe',
            Date:'20:00 12/12/2012',
          }
        ],
        data:{
          Theme:'Prison',
          Difficulte:'Difficile',
          Nb_joueur_max:8,
          Nb_joueur_min:2,
          Adresse:'13 Rue Beccaria',
          Ville: 'Paris',
          Code_postal: '75012',
          Latitude:48.847390,
          Longitude: 2.378877,
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
      })

  }


  componentDidMount() {
    //fetch
  }

  render() {
    const { contextRef } = this.state.contextRef;
    const data = this.state.data;
    return (
      <div >
      <Grid centered columns={2} stackable>
        <Grid.Column computer='8'>
          <Segment vertical>
            <h1>{data.Nom}</h1>
            <h1>{data[`room.Nom`]}</h1> <h3>{data[`escape.Nom`]}</h3>
            <Icon name='marker' />{data.Adresse}, {data.Code_postal} {data.Ville}
          </Segment>
          <Segment vertical>
            <Grid centered columns={2}>
              <Grid.Column>
                <span><Icon name='hashtag' /> <Label>{data.Theme} </Label></span>
              </Grid.Column>
              <Grid.Column>
                <span><Icon name='chain' /> Difficulté : {data.Difficulte} </span><br/>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment vertical>
          <h2>A propos de la room</h2>
          <p>{data[`room.Description`]}</p>
          </Segment>
          <h2>Equipe en cours </h2>
          {this.state.teams.map(team => <List.Item key={team.id}> <Link to={`/team/${team.Id}`}><h3>{team.Nom}</h3></Link> <Icon name='calendar' /> {team.Date} </List.Item>)}
          <h2>Localisation </h2>
          <GoogleMapMarker
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBYzbUIeVSGKMU0-KCJYWD1_X4qC_OsrI&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            position = {{lat: data.Latitude, lng:data.Longitude}}
          />

        </Grid.Column>
        <Grid.Column computer='5'>
          <div ref={this.handleContextRef}>
            <Sticky context={contextRef} >
            <Card fluid>
              <Image src={data.Photo}/>
              <Button color='blue'attached='bottom'> Reserver </Button>
            </Card>
            </Sticky>
            </div>
          </Grid.Column>
      </Grid>
      </div>
    );
  }
}

export default TeamPage;