'use strict';

import React from 'react';
import { Link } from 'react-router';
import mysql from 'mysql';
import PasswordChange from './PasswordChange';
import Form from '../Form';
import { Input, Button, TextArea,  Select, Checkbox } from 'semantic-ui-react';


export default class MyAccount extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        Prenom:'Jean',
        Nom:'Jacques',
        Mail:'j.jacques@bidon.fr',
        Adresse:'666 rue bidon',
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
    alert(this.state.Adresse);
    event.preventDefault();
  }

  componentDidMount() {
    /*var connection =mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : 'root',
     port: "3306"
   });
   connection.connect()
   var result = connection.query("SELECT * FROM mydb.utilisateur WHERE `id`= ?", ['1'], function(errors, results,fields){
     console.log(result);
     this.setState({user : result});
   });
   connection.end();*/
  }

  render() {

    return (
      <div className="My-Account-page">
        <div className="Account-Parameters">
        <h2> Paramètres du compte </h2>
        <Form onSubmit={this.handleSubmit}>
        <h3> Modifier vos informations </h3>
          <div className="Account-Parameters-firstname">
            <label for="Prenom">Prénom: </label><Input type="text" name="Prenom" value={this.state.Prenom} onChange={this.handleChange}/>
          </div>
          <div className="Account-Parameters-lastname">
            <label for="Nom">Nom: </label><Input type="text" name="Nom" value={this.state.Nom} onChange={this.handleChange}/>
          </div>

          <div className="Account-Parameters-adresse">
            <label for="Adresse">Adresse: </label><TextArea name="Adresse" autoHeight  value={this.state.Adresse} onChange={this.handleChange}/>
            <Checkbox label='Rendre cette information visible aux autres utilisateur' />
          </div>

          <Button type="submit">Envoyer </Button>
          </Form>
          <PasswordChange />
        </div>
      </div>
    );
  }
}
