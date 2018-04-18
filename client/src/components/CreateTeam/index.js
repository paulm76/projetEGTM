import React, { Component } from 'react';
import { Input, Button, Message, Dropdown, Container, Label, TextArea, Checkbox } from 'semantic-ui-react';
import {  Link,  withRouter } from 'react-router-dom';
import Form from '../Form';
import moment from 'moment';
//import {DatePicker, DatePickerInput} from 'rc-datepicker';
//import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import DatePicker from 'react-datepicker';
import * as EmailValidator from 'email-validator';
import { sessionService } from 'redux-react-session';
import * as routes from '../../constants/routes';
import findPrice from '../../scripts/findPrice.js'

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
  nb_joueurs_max: 0, //done
  nb_joueurs_actuel: 0, //done
  nb_joueurs_list: [], //done
  startDate: today, //done
  date: today, //done
  room:'', //done
  escape:'', //done
  userMakeReservation: '',
  nomReservation:'', 
  emailReservation:'',
  description:'',
  roomlist:[],
  escapeList:[],
  data:'',
  userid:0,
  tarif_creux:'',
  tarif_plein:'',
  creuses_pleines:'',
  zone_scolaire:'',
  dates_spe:'',
  tarif_final:'',
  isFormSubmit:false,
  //password: '',
  //error: null,
  //isOk:0,//0 to render the form 1 to render the connected state 2 to render the not ok state
  //match:true,
};



class CreateTeamForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createEscapeList = this.createEscapeList.bind(this);
    this.createRoomList = this.createRoomList.bind(this);
    this.state = { ...INITIAL_STATE };
    var url="http://localhost:3001/createteam/getroom";
    fetch(url, {
      method: 'GET',
      mode: 'cors'
    })
    .then(blob=>blob.json())
    .then((response)=>{ this.setState({data:response})
      /*
      //var result=JSON.parse(response);
      var result = response.map((truc)=>{return {'key':response.indexOf(truc),'text':truc.Nom,'value':truc.Nom}})
      console.log(response);
      //console.log("test"+result);
      //var newlist=roomlist.push(result);
      //console.log("newlist"+newlist);
      this.setState({roomlist:result});
      //return result;
      //data=response;
      //console.log(data);
      */
    });
    sessionService.loadUser().then(user=>this.setState({userid:user.id}));
  }

  handleChange(date) {
    this.setState({ startDate: date });
    var prices = findPrice(this.state.startDate, this.state.tarif_creux, this.state.tarif_plein, this.state.creuses_pleines, this.state.dates_spe, this.state.zone_scolaire);
    prices = prices.split(',');
    var res = ["Prix que vous avez payé lors de la réservation : " + prices[this.state.nb_joueurs_actuel - this.state.nb_joueurs_list[0].value] + "€","Economies réalisées en fonction du nombre de joueur en plus :"];
    var pricesLen = this.state.nb_joueurs_max - this.state.nb_joueurs_actuel;
    console.log(this.state.nb_joueurs_max - this.state.nb_joueurs_actuel);
    var firstIndex = this.state.nb_joueurs_actuel - this.state.nb_joueurs_list[0].value;
    for (var i=1; i<=pricesLen; i++){
      if (i>1){
        res.push("+" + i + " joueurs => " + prices[firstIndex + i] + "€/pers");
      } else {
        res.push("+" + i + " joueur => " + prices[firstIndex + i] + "€/pers");
      }
      console.log(prices[firstIndex + i])
    }
    this.setState({ tarif_final: res });
  }

  createEscapeList(data){
    var res = [], etablissements = [];
    var dataLen = data.length;
    for (var i=0; i<dataLen; i++){
      if (etablissements.indexOf(data[i].Etablissement) < 0){
        etablissements.push(data[i].Etablissement)
        var line = {text: data[i].Etablissement, value: data[i].Etablissement}
        res.push(line);
      }
    }
    this.setState({  escapeList: res });
  }

  createRoomList(data){
    var res = [];
    var dataLen = data.length;
    for (var i=0; i<dataLen; i++){
      if (data[i].Etablissement == this.state.escape){
        var line = {text: data[i].Nom, value: data[i].Nom};
        res.push(line);
      }
    }
    this.setState({ roomlist: res });
  }

  createNbPlayerList(data){
    var res = [];
    var dataLen = data.length;
    for (var i=0; i<dataLen; i++){
      if (this.state.room == data[i].Nom){
        var nbPlayerMin = data[i].Nb_places_min;
        var nbPlayerMax = data[i].Nb_places_max;
        this.setState({ tarif_creux: data[i].Tarif_creux });
        this.setState({ tarif_plein: data[i].Tarif_plein });
        this.setState({ creuses_pleines: data[i].Creuses_pleines });
        this.setState({ zone_scolaire: data[i].Zone_scolaire });
        this.setState({ dates_spe: data[i].Dates_spéciales });
        for (var j=nbPlayerMin; j<=nbPlayerMax; j++){
          var line = {text: j, value: j};
          res.push(line);
        }
      }
    }
    this.setState({ nb_joueurs_list: res });
  }

  onSubmit = (event) => {

    this.setState({ isFormSubmit: true });
    console.log(this.state);

    const {
      titre,
      nb_joueurs_max,
      nb_joueurs_actuel,
      nb_joueurs_list,
      startDate,
      date,
      room,
      escape,
      userMakeReservation,
      nomReservation,
      emailReservation,
      description,
      roomlist,
      escapeList,
      data,
      userid,
    } = this.state;

    var url="http://localhost:3001/createteam/";
    var params = 'titre='+titre+'&nb_joueurs_max='+nb_joueurs_max+'&nb_joueurs_actuel='+nb_joueurs_actuel+'&date='+startDate+'&room='+room+'&nomReservation='+nomReservation+'&emailReservation='+emailReservation+'&description='+description+'&userid='+userid;
    fetch(url+"?"+params, {
      method: 'POST',
      mode: 'cors'
    })
    console.log(this.state.isFormSubmit);
  }

  render() {

    if (this.state.data != ''){
      if (this.state.escapeList.length == 0){
        this.createEscapeList(this.state.data);
      } else {
        if (this.state.escape && this.state.roomlist.length == 0){
          this.createRoomList(this.state.data);
        } else if (this.state.escape && this.state.room && this.state.nb_joueurs_list.length == 0){
          this.createNbPlayerList(this.state.data);
        }
      }

      return(
        <div>
          <style>
            {`.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
              padding-left: 0;
              padding-right: 0;
            }`}
          </style>

          <Dropdown
            onChange={(event, data) => {
              this.setState({ escape: data.value });
              this.createRoomList(this.state.data);
            }}
            placeholder='Etablissements'
            fluid selection options={this.state.escapeList}
          />

          { this.state.escape != "" && <Dropdown
            onChange={(event, data) => {
              this.setState({ room: data.value });
              this.createNbPlayerList(this.state.data);
            }}
            placeholder='Jeux'
            fluid selection options={this.state.roomlist}
          />}

          {this.state.room != '' && <Dropdown
            onChange={(event, data) => {
              this.setState({nb_joueurs_actuel: data.value});
            }}
            placeholder='Nombre de joueurs actuel'
            fluid selection options={this.state.nb_joueurs_list}
          />}

          {this.state.nb_joueurs_actuel != "" && <Dropdown
            onChange={(event, data) => {
              this.setState({ nb_joueurs_max: data.value });
            }}
            placeholder='Nombre de joueurs maximum voulu'
            fluid selection options={this.state.nb_joueurs_list}
          />}

          {this.state.nb_joueurs_max != 0 &&
          <div style={{ display: 'flex', margin: '0px 0px 10px 0px' }}>
            <Label>Date et heure de début de la partie</Label>
            <DatePicker
              placeholderText="Date de la partie"
              selected={this.state.startDate}
              onChange={this.handleChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="LLL"
            />
          </div>}

          {this.state.tarif_final != '' && <div>
            {this.state.tarif_final.map( line => <p>{line}</p> )}
          </div>}

          {this.state.startDate != today && <Input
            onChange={event => this.setState({ titre: event.target.value })}
            type="text"
            placeholder="Nom de l'équipe"
          />}

          {this.state.titre != '' && <div> 
            <Input
              onChange={event => this.setState({ description: event.target.value })}
              type="text"
              placeholder="Description (facultatif)"
            />
            <p>Merci d'indiquer le nom, le prénom et l'adresse mail de la personne ayant réservé si ce n'est pas vous</p>
            <Input
              onChange={event => this.setState({ nomReservation: event.target.value })}
              type="text"
              placeholder="Nom et prénom"
            />
            <Input
              onChange={event => this.setState({ emailReservation: event.target.value })}
              type="text"
              placeholder="email"
            />
            <Button onClick={this.onSubmit}>
              Créer l'équipe
            </Button>
          </div>}   

        </div>
      );

    } else if(!this.state.isFormSubmit){

      return(<p style={{ textAlign: 'center' }}>Chargement de la page</p>);
      
    } else if (this.state.isFormSubmit){
      return(<p>Envoyé</p>);
    }
  }
}

export default withRouter(CreateTeamPage);
export {CreateTeamForm}