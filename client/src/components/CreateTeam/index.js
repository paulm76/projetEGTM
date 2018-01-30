import React, { Component } from 'react';
import { Input, Button,Message,Dropdown,Container,Label} from 'semantic-ui-react';
import {  Link,  withRouter } from 'react-router-dom';
import Form from '../Form';
import moment from 'moment'
//import {DatePicker, DatePickerInput} from 'rc-datepicker';
//import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const CreateTeamPage = ({ props,history }) =>
<div>
<CreateTeamForm history={history} props={props}/>
</div>

const today=moment()

const INITIAL_STATE = {
  titre: '',//nom de l'equipe appelé titre dans la base de donnée
  nb_joueurs_max: 0,
  startDate: today,
  date: today,
  room:'',
  nomReservation:'',
  emailReservation:'',
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
      startDate,
      date,
      room,
      nomReservation,
      emailReservation,
    } = this.state;

    var url="http://localhost:3001/createteam";

    fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      mode: 'cors',
      body: 'titre='+titre+'&nb_joueurs_max='+nb_joueurs_max+'&date='+startDate+'&room='+room+'&nomReservation='+nomReservation+'&emailReservation='+emailReservation
    })
  };

  render() {

    const {
      titre,
      nb_joueurs_max,
      startDate,
      date,
      room,
      nomReservation,
      emailReservation,
    } = this.state;

    const isInvalid =
    titre==='';

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
const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]
//{event =>{ this.setState({ nb_joueurs_max: event.target.value });console.log(event.target.text)}}
//this.props.setGroup(data.value);
//this.setState({ nb_joueurs_max: data.value });
//console.log(data.value);
// }
//chercher un react date picker
this.handleChange = this.handleChange.bind(this);
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
  fluid search selection options={options} />

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
