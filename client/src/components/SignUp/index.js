import React, { Component } from 'react';
import {  Link,  withRouter } from 'react-router-dom';
import { Input, Button} from 'semantic-ui-react';
import crypto from 'crypto'
import Form from '../Form';
//import validator from 'validator';
import * as EmailValidator from 'email-validator';
import ReactPasswordStrength from 'react-password-strength';
import * as routes from '../../constants/routes';



const INITIAL_STATE = {
  prenom: '',
  nom:'',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    console.log("submit")

    const {
      prenom,
      nom,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;
    const hash=crypto.createHmac('sha256',passwordOne).digest('hex');
    var url="http://localhost:3001/signup";

    return fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      mode: 'cors',
      body: 'prenom='+prenom+'&nom='+nom+'&email='+email+'&password='+hash
    })
  //.then(json)
    .then(function (data) {
      console.log(data.json());
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
      event.preventDefault();
  }


  clear = () => this.ReactPasswordStrength.clear();


  render() {
    const {
      prenom,
      nom,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;



    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      prenom === ''||
      nom === ''||
      !(EmailValidator.validate(email));



    return (
      <Form onSubmit={this.onSubmit} id='signupform'>
        <Input
          value={prenom}
          onChange={event => this.setState({ prenom: event.target.value })}
          type="text"
          placeholder="Prénom"
        />
        <Input
          value={nom}
          onChange={event => this.setState({ nom: event.target.value })}
          type="text"
          placeholder="Nom"
        />
        <Input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}

          type="text"
          placeholder="Addresse Email"
        />

        <ReactPasswordStrength
          minLength={8}
          minScore={2}
          tooShortWord='8 caractères minimum'
          scoreWords={['faible', 'moyen', 'bon', 'élevé', 'très élevé']}
          changeCallback={event =>
          this.setState({ passwordOne: event.password })}
          inputProps={{  autoComplete: "off",placeholder:"Mot de passe"}}
        />

        <ReactPasswordStrength
          minLength={8}
          minScore={2}
          tooShortWord='8 caractères minimum'
          scoreWords={['faible', 'moyen', 'bon', 'élevé', 'très élevé']}
          changeCallback={event =>
    this.setState({ passwordTwo: event.password })}
          inputProps={{  autoComplete: "off",placeholder:"Confirmer le mot de passe" }}
        />

        <Button disabled={isInvalid} type="submit">
          Envoyer
        </Button>
        { error && <p>{error.message}</p> }
      </Form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to="/signup">Sign Up</Link>
  </p>

export default withRouter(SignUpForm);

export {
  SignUpForm,
  SignUpLink,
};
