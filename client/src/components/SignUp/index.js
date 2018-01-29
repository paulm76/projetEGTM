import React, { Component } from 'react';
import {  Link,  withRouter } from 'react-router-dom';
import { Input, Button,Message} from 'semantic-ui-react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import crypto from 'crypto'
import Form from '../Form';
import * as EmailValidator from 'email-validator';
import ReactPasswordStrength from 'react-password-strength';
import * as routes from '../../constants/routes';
//import styles from './style.css';

/*------------------Init ------------------------*/
const INITIAL_STATE = {
  prenom: '',
  nom:'',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  nationality: '',
  country: '',
  error: null,
  mailindatabase:false,
  step:1,
};

/*------------------Class ------------------------*/
class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  isMailInDatabase = (email) =>
  {
    //function to be sure that no user can have the same mail than another
    //true if in database
    if(EmailValidator.validate(email))
    {
      console.log("email="+email);
      var url="http://localhost:3001/signup/isMailInDatabase?email="+email;
      fetch(url, {
        method: 'GET',
        mode: 'cors'
      }).then(blob=>blob.json())
      .then((data)=>{
        //console.log("response from server="+data);
        this.setState({mailindatabase:data});
        return data;
      })
    }
    else {
      console.log("invalid email");
      return false;
    }
  }
  /*------------------Form submit ------------------------*/
  onSubmit = (event) => {
    //console.log("submit")

    const {
      prenom,
      nom,
      email,
      passwordOne,
      nationality,
      country,
    } = this.state;


    const {
      history,
    } = this.props;
    const hash=crypto.createHmac('sha256',passwordOne).digest('hex');
    var url="http://localhost:3001/signup";

    fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      mode: 'cors',
      body: 'prenom='+prenom+'&nom='+nom+'&email='+email+'&password='+hash+'&country='+country+'&nationality='+nationality
    })
    this.setState({step:2});
  };



  clear = () => this.ReactPasswordStrength.clear();
  selectCountry (val) {
    this.setState({ country: val });
    //console.log(val);
  }
  selectNationality (val) {
    this.setState({ nationality: val });
    //console.log(val);
  }
  /*------------------Render ------------------------*/
  render() {
    const {
      prenom,
      nom,
      email,
      passwordOne,
      passwordTwo,
      error,
      country,
      nationality,
      mailindatabase,
      step
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    prenom === ''||
    nom === ''||
    nationality===''||
    country===''||
    !(EmailValidator.validate(email))||
    mailindatabase;
    /*------------------Form Render ------------------------*/
    if(step==1)
    {
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
        onChange={event =>{
          this.setState({ email: event.target.value });
          this.setState({mailindatabase:this.isMailInDatabase(event.target.value)});
        }}
        type="text"
        placeholder="Addresse Email"
        />
        <CountryDropdown
        classes="input "
        name=""
        defaultOptionLabel="Choisir la nationalité"
        value={nationality}
        valueType="short"
        onChange={(val) => this.selectNationality(val)} />

        <CountryDropdown
        name=""
        defaultOptionLabel="Choisir le pays de résidence"
        value={country}
        valueType="short"
        onChange={(val) => this.selectCountry(val)} />

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
            inputProps={{  autoComplete: "off",placeholder:"Confirmer le mot de passe"}}
            />
            {mailindatabase && <Message negative>Cet email est déja utilisé</Message>}
            {passwordOne !== passwordTwo && <Message negative>Les mots de passe doivent être identique</Message>}
            <Button disabled={isInvalid} type="submit">
            Envoyer
            </Button>
            { error && <p>{error.message}</p> }
            </Form>
          );

        }
        else{
          return (
            <Message>Félicitations, vous avez bien été enregistré!</Message>
          )
        }

      }
    }
    const SignUpLink = () =>
    <p>
    Nouvel utilisateur?
    {' '}
    <Link to="/signup">{"S'inscrire"}</Link>
    </p>
    export default withRouter(SignUpForm);

    export {
      SignUpForm,
      SignUpLink,
    };
