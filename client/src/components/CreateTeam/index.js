import React, { Component } from 'react';
import { Input, Button,Message,Dropdown,Container,Label,TextArea} from 'semantic-ui-react';
import {  Link,  withRouter } from 'react-router-dom';
import Form from '../Form';
import moment from 'moment';
//import {DatePicker, DatePickerInput} from 'rc-datepicker';
//import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import DatePicker from 'react-datepicker';
import * as EmailValidator from 'email-validator';
import { sessionService } from 'redux-react-session';

import 'react-datepicker/dist/react-datepicker.css';

const CreateTeamPage = ({ props,history }) =>
<div>
<CreateTeamForm history={history} props={props}/>
</div>

const today=moment()

//var options2=data();
//console.log("options2"+data());
const INITIAL_STATE = {
  titre: '',//nom de l'equipe appelé titre dans la base de donnée
  nb_joueurs_max: 0,
  nb_joueurs_actuel: 0,
  startDate: today,
  date: today,
  room:'',
  nomReservation:'',
  emailReservation:'',
  description:'',
  roomlist:[],
  userid:0,
  //password: '',
  //error: null,
  //isOk:0,//0 to render the form 1 to render the connected state 2 to render the not ok state
  //match:true,
};



class CreateTeamForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { ...INITIAL_STATE };
    var url="http://localhost:3001/createteam/getroom";
    fetch(url, {
      method: 'GET',
      mode: 'cors'
    })
    .then(blob=>blob.json())
    .then((response)=>{

      //var result=JSON.parse(response);
      var result = response.map((truc)=>{return {'key':response.indexOf(truc),'text':truc.Nom,'value':truc.Nom}})
      console.log(result);
      //console.log("test"+result);
      //var newlist=roomlist.push(result);
      //console.log("newlist"+newlist);
      this.setState({roomlist:result});
      //return result;
      //data=response;
      //console.log(data);
    });
    sessionService.loadUser().then(user=>{this.setState({userid:user.id});
  console.log(user.id)});
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  onSubmit = (event) => {
    const {
      titre,
      nb_joueurs_max,
      nb_joueurs_actuel,
      startDate,
      date,
      room,
      nomReservation,
      emailReservation,
      description,
      roomlist,
      userid,
    } = this.state;



    var url="http://localhost:3001/createteam";
    console.log("userid"+userid);
    fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      mode: 'cors',
      body: 'titre='+titre+'&nb_joueurs_max='+nb_joueurs_max+'&nb_joueurs_actuel='+nb_joueurs_actuel+'&date='+startDate+'&room='+room+'&nomReservation='+nomReservation+'&emailReservation='+emailReservation+'&description='+description+'&userid='+userid
    })
  };

  render() {

    const {
      titre,
      nb_joueurs_max,
      nb_joueurs_actuel,
      startDate,
      date,
      room,
      nomReservation,
      emailReservation,
      description,
      roomlist,
      userid,
    } = this.state;

    const isInvalid =
    titre===''||
    nb_joueurs_max==0||
    nb_joueurs_actuel==0||
    startDate==date||
    room===''||
    nomReservation===''||
    emailReservation===''||
    !(EmailValidator.validate(emailReservation))||
    nb_joueurs_actuel>=nb_joueurs_max;

    const dropDownMaxNumber=[
      {text:'1',
      value:'1'
    },
    {text:'2',
    value:'2'
  },
  {text:'3',
  value:'3'
},
{text:'4',
value:'4'
},
{text:'5',
value:'5'
},
{text:'6',
value:'6'
},
{text:'7',
value:'7'
},
{text:'8',
value:'8'
},
{text:'9',
value:'9'
},
{text:'10',
value:'10'
},
{text:'11',
value:'11'
},
{text:'12',
value:'12'
},
]


//{event =>{ this.setState({ nb_joueurs_max: event.target.value });console.log(event.target.text)}}
//this.props.setGroup(data.value);
//this.setState({ nb_joueurs_max: data.value });
//console.log(data.value);
// }
//chercher un react date picker
this.handleChange = this.handleChange.bind(this);
/*  const option = _.find(options, { value })
  console.log(`Changed to text: ${option.text}`)
}*/
/*
{(event, data) => {
  this.setState({room: data.Nom});
}}*/
return(

  <Form onSubmit={this.onSubmit} id='createteamform'>
  <style>
  {`.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
    padding-left: 0;
    padding-right: 0;
  }`}
  </style>
  <Input
  value={titre}
  onChange={event => this.setState({ titre: event.target.value })}
  type="text"
  placeholder="Nom de l'équipe"
  />

  <Dropdown
  onChange={(event, data) => {
    this.setState({nb_joueurs_actuel: data.value});
  }}
  placeholder='Nombre de joueurs actuel'
  fluid selection options={dropDownMaxNumber}
  />

  <Dropdown
  onChange={(event, data) => {
    this.setState({nb_joueurs_max: data.value});
  }}
  placeholder='Nombre maximum de joueurs souhaités'
  fluid selection options={dropDownMaxNumber}
  />

  <Label>Préciser le début de la partie</Label>
  <DatePicker
  placeholderText="Date de la partie"
  selected={this.state.startDate}
  onChange={this.handleChange}
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  dateFormat="LLL"
  />

  <Dropdown
  onChange={(event, data) => {
    this.setState({room: data.value});
  }}
  placeholder="L'Escape Room"
  fluid search selection options={roomlist} />

  <Input
  value={nomReservation}
  onChange={event => this.setState({ nomReservation: event.target.value })}
  type="text"
  placeholder="Nom de la personne qui a réservé"
  />

  <Input
  value={emailReservation}
  onChange={event => this.setState({ emailReservation: event.target.value })}
  type="text"
  placeholder="Email de la personne qui a réservé"
  />
  <TextArea
  value={description}
  onChange={event => this.setState({ description: event.target.value })}
  placeholder='Description' />


  <Button disabled={isInvalid} type="submit">
  Créer l'équipe
  </Button>
  </Form>

)
};


}

export default withRouter(CreateTeamPage);
export {
  CreateTeamForm,
};
