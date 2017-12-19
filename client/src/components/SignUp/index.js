import React, { Component } from 'react';
import {  Link,  withRouter } from 'react-router-dom';
import { Input, Button} from 'semantic-ui-react';

import Form from '../Form';
//import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

const INITIAL_STATE = {
  username: '',
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
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;
/*
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.FRONTPAGE);
          })
          .catch(error => {
            this.setState(() => ({ error }));
          });
o
      })
      .catch(error => {
        this.setState(() => ({ error }));
      });
*/
    //fetch
    /*
    fetch('https://davidwalsh.name/submit', {
	method: 'post',
	body: new FormData(document.getElementById('comment-form'))
});
fetch(url, {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: 'foo=bar&lorem=ipsum'
  })
  .then(json)
  .then(function (data) {
    console.log('Request succeeded with JSON response', data);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
  var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
*/
var url="http://localhost:3001/signup";
//var form=new FormData(document.getElementById('signupform'));
return fetch(url, {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    mode: 'cors',
    body: 'username='+username+'&email='+email+'&password='+passwordOne
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

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '';

    return (
      <Form onSubmit={this.onSubmit} id='signupform'>
        <Input
          value={username}
          onChange={event => this.setState({ username: event.target.value })}
          type="text"
          placeholder="Prénom"
        />
        <Input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Addresse Email"
        />
        <Input
          value={passwordOne}
          onChange={event => this.setState({ passwordOne: event.target.value })}
          type="password"
          placeholder="Mot de passe"
        />
        <Input
          value={passwordTwo}
          onChange={event => this.setState({ passwordTwo: event.target.value })}
          type="password"
          placeholder="Confirmer le Mot de passe"
        />
        <Button disabled={isInvalid} type="submit">
          Se connecter
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
