import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import Team from './team.js';
import PageNotFound from '../PageNotFound';
import findPrice from '../../scripts/findPrice.js';

import PaymentPage from './Payment'
import Card from './Payment/card.js'
import Modal from 'react-responsive-modal';
import queryString from 'query-string';
import PaymentValid from '../PaymentValid';
import request from 'request';
import { sessionService } from 'redux-react-session';
import TeamMembers from '../TeamMembers';
import formatedDate from '../../scripts/formatedDate.js';



class TeamPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamInfo: [],
      price: 0,
      place: { value: 0, label: 1 },
      isLoading:true,
      open: false,
      paystep:0,
      paymentValid:false,
      prices:'',
      places:'',
      team:'',
      users:'',
      room:'',
      payInId:'',
      userid:'',
      authenticated:false,
    };

  }

  componentDidMount() {
    console.log(this.props)
  	var query = this.props.location.search
  	var id = query.substring(8, query.length);
	var headers = new Headers();
	var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
	fetch('http://localhost:3001/team?teamId=' + id, init).then(res => res.json())
  .then((teamInfo) => {
    var team = JSON.parse(teamInfo[0]);
    var users = JSON.parse(teamInfo[1]);
    var room = JSON.parse(teamInfo[2]);
    var prices = findPrice(team[0].Date, room[0].Tarif_creux, room[0].Tarif_plein, room[0].Creuses_pleines, room[0].Dates_speciales);
    prices = prices.split(',');
    var places = []
    for (var i=0; i<room[0].Nb_places_max - team[0].Nb_joueurs; i++){
      	 places.push({value: i, label: i + 1});
    }
    this.setState({teamInfo: teamInfo, isLoading:false ,prices:prices, places:places, team:team, users:users, room:room,price:prices[team[0].Nb_joueurs-room[0].Nb_places_min+1]})
  })
  sessionService.loadUser().then(user=>this.setState({userid:user.id, authenticated:true}))
  }

  show = () => {
    const history = this.props.history;
    if(!this.state.authenticated){
      history.push('./signin')
    }
      this.setState({ open: true, })
    }

  callbackTeam = (price,place) => { this.setState({ 'price':price, 'place':place})}

  callbackPay =  (isSaved, isSaving) => {

    const {
      prices,
      team
    } = this.state
    const userid=this.state.userid;
    const history=this.props.history;
    const amountEscape=prices[team[0].Nb_joueurs+this.state.place.label]*(team[0].Nb_joueurs+this.state.place.label)-prices[team[0].Nb_joueurs]*team[0].Nb_joueurs;

    var headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded')
    const form = {
      "userid":userid,
      "teamid":this.state.team[0].id,
      "amountEscape":amountEscape,
      "prix":this.state.price*this.state.place.label,
      "places":this.state.place.label
    }
    if (isSaved){
      var options = { url:'http://localhost:3001/mangopay/createPayIn' , header: headers, form:form };
      request.post(options,(err, httpResponse, body) => {
        const res = JSON.parse(body);
          if (res.SecureModeNeeded){
            window.location.replace(res.SecureModeRedirectURL)
          }
          else{
          if(res.Status==='SUCCEEDED'){
            this.setState({ 'paystep':2, paymentValid:true, payInId: res.Id})
          }
          else{
            this.setState({ 'paystep':2, paymentValid:false})
          }
        }
      });
    }
    else{
      if (isSaving){
        this.setState({ 'paystep':1,});
      }
      else{
        var options = { url:'http://localhost:3001/mangopay/createWebPayIn' , header: headers, form:form };
        request.post(options,(err, httpResponse, body) => {
          const res = JSON.parse(body);
            window.location.replace(res.RedirectURL)
        });
      }
    }
  }

  close = () => this.setState({ open: false, 'paystep':0 })

  render() {
    const {
      prices,
      places,
      room,
      users,
      team
    } = this.state

    const { open } = this.state;
    if (this.state.isLoading){
      return <Loader />
    }
  	if (this.state.teamInfo && this.state.teamInfo!="" && this.state.teamInfo!="null"){
	    var admin;
	    var usersLen = users.length;
	    for (var i=0; i<usersLen; i++){
	      if (users[i].id == team[0].id_admin){
	        admin = users[i];
	      }
	    }

	    return (
	      <div >
	        <Team room={room} userid={this.state.userid} users={users} team={team} admin={admin} prices={prices} places={places} history={this.props.history} join={this.show} dataCallback={this.callbackTeam} place={this.state.place} price={this.state.price}/>
          <Modal open={open} onClose={this.close} little>
            {this.state.paystep===0 && <PaymentPage history={this.props.history} place={this.state.place} price={this.state.price} params={{teamid:team[0].id, userid: this.state.userid}} history={this.props.history} paymentCallback={this.callbackPay} dataCallback={this.callbackTeam} prices={prices} places={places} room={room} usersLen={usersLen}/>}
            {this.state.paystep===1 && <Card price={this.state.price*this.state.place.label} userid={this.state.userid} paymentCallback={this.callbackPay}/>}
            {this.state.paystep===2 && <PaymentValid modal paymentValid={this.state.paymentValid} transactionId={this.state.payInId}/>}

          </Modal>
         </div>
	    );
  	} else {
    	return <PageNotFound />
  	}
  }
}

export default TeamPage;
