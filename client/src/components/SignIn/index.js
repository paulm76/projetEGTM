import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button,Message } from 'semantic-ui-react';
import styled from 'styled-components';
import crypto from 'crypto'
import Form from '../Form';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import * as routes from '../../constants/routes';
import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { createStore } from 'redux';
import { sessionService } from 'redux-react-session';

//first part
const reducers = {
  // ... your other reducers here ...
  session: sessionReducer
};
const reducer = combineReducers(reducers);
//second part
const store = createStore(reducer)

sessionService.initSessionService(store);

const SignInAdditional = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const SignInPage = ({ history }) =>
<div>
<SignInForm history={history} />
<SignInAdditional>
<PasswordForgetLink />
<SignUpLink />
</SignInAdditional>
</div>

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  isOk:0,//0 to render the form 1 to render the connected state 2 to render the not ok state
  match:true,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  /*isItOk=()=>{
  return isOk;
}*/

onSubmit = (event) => {
  const {
    email,
    password,
    isOk,
    match,
  } = this.state;

  const {
    history,
  } = this.props;
  event.preventDefault();
  const hash=crypto.createHmac('sha256',password).digest('hex');
  var url="http://localhost:3001/signin";
  fetch(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    mode: 'cors',
    body: 'email='+email+'&password='+hash
  })
  .then(blob=>blob.json())
  .then((data)=>{
    if(data){
      //mail and password match
      this.setState({isOk:1});

    }
    else {
      //mail and password don't match
      this.setState({isOk:2});
      //window.alert("Votre email ou Votre email ou mot de passe est incorrectmot de passe est incorrect")
    }
    this.setState({match:data});
  })
}

render() {
  const {
    email,
    password,
    error,
    isOk,
  } = this.state;

  /*isItOk= () => {
  return isOk;
}*/


const isInvalid =
password === '' ||
email === '';
if(isOk==0)
{
  //form
  return (
    <Form onSubmit={this.onSubmit}>
    <Input
    value={email}
    onChange={event => this.setState({ email: event.target.value })}
    type="text"
    placeholder="Adresse email"
    />
    <Input
    value={password}
    onChange={event => this.setState({ password: event.target.value })}
    type="password"
    placeholder="Mot de Passe"
    />
    <Button disabled={isInvalid} type="submit">
    Se connecter
    </Button>

    { error && <p>{error.message}</p> }
    </Form>
  );
}
if(isOk==2){
  return(
    <Form onSubmit={this.onSubmit}>
    <Input
    value={email}
    onChange={event => this.setState({ email: event.target.value })}
    type="text"
    placeholder="Adresse email"
    />
    <Input
    value={password}
    onChange={event => this.setState({ password: event.target.value })}
    type="password"
    placeholder="Mot de Passe"
    />
    <Message negative>Votre email ou votre mot de passe est incorrect</Message>
    <Button disabled={isInvalid} type="submit">
    Se connecter
    </Button>

    { error && <p>{error.message}</p> }
    </Form>
  );
}
else  {
  //connected
  return(
    <Message>Vous êtes à présent connecté.</Message>
  );
}
/*else{
//incorrect
return(
<Message>Votre email ou votre mot de passe est incorrect</Message>
);
}*/

}
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
