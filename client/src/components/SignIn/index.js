import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button,Message } from 'semantic-ui-react';
import styled from 'styled-components';
import crypto from 'crypto'
import Form from '../Form';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import * as routes from '../../constants/routes';
<<<<<<< HEAD
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../scripts/sessionActions.js';
import { sessionService } from 'redux-react-session';
=======
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
>>>>>>> 2b8a18a7f118df432bfb174ecc44995c1683a49e

const SignInAdditional = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

<<<<<<< HEAD
=======
const SignInPage = ({ history }) =>
<div>
<SignInForm history={history} />
<SignInAdditional>
<PasswordForgetLink />
<SignUpLink />
</SignInAdditional>
</div>
>>>>>>> 2b8a18a7f118df432bfb174ecc44995c1683a49e

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  isOk:0,//0 to render the form 1 to render the connected state 2 to render the not ok state
  match:true,
};

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  /*isItOk=()=>{
  return isOk;
}*/
<<<<<<< HEAD

onSubmit = (event) => {
  const {
    email,
    password,
  } = this.state;

  const {
    history,
  } = this.props;
  event.preventDefault();
  const hash=crypto.createHmac('sha256',password).digest('hex');
  const user = {'email':this.state.email,'password':hash};
  const { login } = this.props.actions;

  var url="http://localhost:3001/signin";
  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    mode: 'cors',
    body: 'email='+user.email+'&password='+user.password
  }).then(blob=>blob.json()).then((response)=>{
    if (response){
      const { token } = response;
      sessionService.saveSession({ token })
      .then(() => {
        sessionService.saveUser(response.data)
        .then(() => {
          sessionService.loadSession().then(res=>console.log(res)).then(()=>{
            history.push('/');
          }
          )
        }).catch(err => console.error(err));
      }).catch(err => console.error(err));
    }
    else{
      this.setState({isOk:2,match:false})
    }
  });
}

=======

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

>>>>>>> 2b8a18a7f118df432bfb174ecc44995c1683a49e
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
<<<<<<< HEAD
const isInvalid =
password === '' ||
email === '';
  //form
  return (
    <div>
=======


const isInvalid =
password === '' ||
email === '';
if(isOk==0)
{
  //form
  return (
>>>>>>> 2b8a18a7f118df432bfb174ecc44995c1683a49e
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
<<<<<<< HEAD
    {isOk===2 &&<Message negative>Votre email ou votre mot de passe est incorrect</Message>}
=======
>>>>>>> 2b8a18a7f118df432bfb174ecc44995c1683a49e
    <Button disabled={isInvalid} type="submit">
    Se connecter
    </Button>

    { error && <p>{error.message}</p> }
    </Form>
<<<<<<< HEAD
    <SignInAdditional>
    <PasswordForgetLink />
    <SignUpLink />
    </SignInAdditional>
    </div>
  );
=======
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
>>>>>>> 2b8a18a7f118df432bfb174ecc44995c1683a49e
}
/*else{
//incorrect
return(
<Message>Votre email ou votre mot de passe est incorrect</Message>
);
}*/

}

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};


export default connect(null, mapDispatch)(SignInPage);
