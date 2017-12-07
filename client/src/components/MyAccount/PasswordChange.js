'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Input, Button, Label } from 'semantic-ui-react';
import Form from '../Form';


export default class PasswordChange extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        oldPW:'',
        newPW:'',
        newPWconfirm:'',
        error:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    console.log(value)
    this.setState({
      [name]: value
    });

  }

  handleSubmit(event) {
    if (this.state.oldPW==='' || this.state.newPW==='' || this.state.newPWconfirm===''){
      this.setState({ error:'Veuillez remplir tous les champs !'});
    }

    else{
      if (this.state.newPW!==this.state.newPWconfirm){
        this.setState({ error:'Les champs nouveau mot de passe et confirmation ne correspondent pas !'});
      }

      else {
        //SEND TO DB
      }
    }

    event.preventDefault();
  }

  componentDidMount() {

  }

  render() {
    var AlertStyle = { display:'none'}
    const error = this.state.error;
    if (error !== ''){
      AlertStyle = { display:'block'}
    }
    return (
        <div className="Account-PasswordChange">
        <Form onSubmit={this.handleSubmit}>
        <h3> Modifier votre Mot de Passe </h3>
          <div className="Account-OldPassword">
            <label for="oldPW">Ancien mot de passe: </label>
            <Input type="text" name="oldPW" onChange={this.handleChange}/>
          </div>
          <div className="Account-NewPassword">
            <label for="newPW">Nouveau mot de passe: </label><Input type="text" name="newPW" onChange={this.handleChange}/>
          </div>
          <div className="Account-NewPassword-Confirm">
            <label for="newPWconfirm">Confirmation nouveau mot de passe: </label><Input type="text" name="newPWconfirm" onChange={this.handleChange}/>
          </div>
          <Label color='red' basic style={AlertStyle} > {error}  </Label>
          <Button type="submit">Envoyer </Button>
          </Form>
        </div>
    );
  }
}
