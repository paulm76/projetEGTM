'use strict';

import React from 'react';
import { Link } from 'react-router';
import mysql from 'mysql';
import PasswordChange from './PasswordChange';
import Form from '../Form';
import PayOut from '../PayOut';
import { sessionService } from 'redux-react-session';
import { Input, Button, TextArea,  Select, Checkbox, Loader } from 'semantic-ui-react';
import formatedDate from '../../scripts/formatedDate.js';

export default class MyAccount extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        userid:'',

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    var init = { method: 'GET', mode: 'cors', cache: 'default' };
    sessionService.loadUser().then(user=>{
      this.setState({userid:user.id})
      fetch('http://localhost:3001/getUser?id=' + user.id, init).then(blob => blob.json()).then(user =>  this.setState({ user: user }))
    })

  }

  render() {

  if (this.state.user){
      return (
          <div className="My-Account-page">
            <div className="Account-Parameters">
            <h2> Paramètres du compte </h2>
            <Form onSubmit={this.handleSubmit}>
            <h3> Vos informations </h3>
              <p>{this.state.user.Prenom}</p>
              <p>{this.state.user.Nom}</p>
              <p>Né le {formatedDate(this.state.user.Date_naissance)}</p>
              <p>Inscrit le {formatedDate(this.state.user.Date_inscription)}</p>
              <p>Partie jouées :{this.state.user.Nb_parties}</p>
              </Form>
              <PasswordChange userid={this.state.userid}/>
            </div>
            <PayOut />
          </div>
      );
    }
    else{
      return(
        <Loader active />
      )
    }
  }
}
