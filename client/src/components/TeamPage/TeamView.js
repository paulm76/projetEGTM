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
        contextRef :'',
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
      })

  }


  componentDidMount() {
    //fetch
  }

  render() {
    const { contextRef } = this.state.contextRef;
    const data = this.state.data;
    const creator = this.state.members.find(member=> member.Id==data.id_admin);
    const places = [];
    for (var i = 1; i < data.Nb_joueur_max-data.Nb_joueur+1; i++){
      places.push({value:i,label:i})
    };
    return (
      <div >
      <Grid centered columns={2} stackable>
        <Grid.Column computer='8'>
          <Segment vertical>
            <h1>{data.Nom}</h1>
            <Link to={`/room/${data["room.id"]}`}><h1>{data[`room.Nom`]}</h1></Link> <h3>{data[`escape.Nom`]}</h3>
            <Icon name='marker' />{data.Adresse}, {data.Code_postal} {data.Ville}
            &nbsp;&nbsp;<Icon name='calendar' /> {data.Date}
          </Segment>
          <Segment vertical>
            <Grid centered columns={2}>
              <Grid.Column>
                <span>Créée par {creator.Prenom}  {creator.Nom.substring(0,1)}. <Image src={creator.avatar} avatar /> </span><br/>
                <span><Icon name='users' /> {data.Nb_joueur}/{data.Nb_joueur_max} membres </span><br/>
                <span><Icon name='hashtag' /> <Label>{data.Theme} </Label></span>
              </Grid.Column>
              <Grid.Column>
                <span><Icon name='chain' /> Difficulté : {data.Difficulte} </span><br/>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment vertical>
          {(data.Description!='' && data.Description) &&
            <span>
              <h2>A propos de l équipe</h2>
              <p>{data.Description}</p>
            </span>
          }
          <h2>A propos de la room</h2>
          <p>{data[`room.Description`]}</p>
          </Segment>
          <h2>Membres </h2>
          <List>
          {this.state.members.map(member => <List.Item key={member.id}><Image src={member.avatar} avatar /> {member.Prenom}  {member.Nom.substring(0,1)}.</List.Item>)}
          </List>
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
              <Card.Content>
              <Grid centered columns={2}>
                <Grid.Column >
                <Select value={this.state.nplace} onChange={this.handleChange} options={places} clearable={false} style={{width:'20px', display:'in-line'}} menuContainerStyle={{width:'42px'}} />places
                </Grid.Column>
                <Grid.Column>
                <b style={{'font-size':'26px'}}>{this.state.nplace*this.state.price} €</b>
                {this.state.nplace>1 &&  <span> soit {this.state.price} € par personnes</span> }
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
  }
}

export default TeamPage;