import React from 'react';
import { Input, Button,Message} from 'semantic-ui-react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Form from '../Form';

const INITIAL_STATE = {
  societe:'',
  prenom: '',
  nom:'',
  email: '',
  birthday:'',
  nationality: '',
  country: '',
  error: null,
  escape:'',
};

export default class EscapeMangopay extends React.Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {

  }

  onSubmit= (e) =>{
    const {
      societe,
      prenom,
      nom,
      email,
      birthday,
      nationality,
      country,
      escape,
      error,
    }=this.state;
    e.preventDefault()
    fetch("http://localhost:3001/mangopay/createLegalUser", {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      mode: 'cors',
      body: 'prenom='+prenom+'&nom='+nom+'&mail='+email+'&societe='+societe+'&pays='+country+'&nationalite='+nationality+'&birthday='+birthday+"&escape="+escape
    })
  }

  selectCountry (val) {
    this.setState({ country: val });
  }
  selectNationality (val) {
    this.setState({ nationality: val });
  }

  render() {

    const {
      societe,
      prenom,
      nom,
      email,
      birthday,
      nationality,
      country,
      error,
      escape,
    }=this.state;
    return(
      <Form onSubmit={this.onSubmit} id='signupform'>
      <Input
      value={escape}
      onChange={event => this.setState({ escape: event.target.value })}
      type="text"
      placeholder="Nom de l'Etablissement"
      />
      <Input
      value={societe}
      onChange={event => this.setState({ societe: event.target.value })}
      type="text"
      placeholder="Nom de Société"
      />
      <Input
      value={prenom}
      onChange={event => this.setState({ prenom: event.target.value })}
      type="text"
      placeholder="Prénom du Représentant légal"
      />
      <Input
      value={nom}
      onChange={event => this.setState({ nom: event.target.value })}
      type="text"
      placeholder="Nom du Représentant légal"
      />
      <Input
      value={email}
      onChange={event =>{
        this.setState({ email: event.target.value });
      }}
      type="text"
      placeholder="Addresse Email"
      />
      <Input
      value={birthday}
      onChange={event => this.setState({ birthday: event.target.value })}
      type="date"
      placeholder="Date de naissance du Représentant légal"
      />
      <CountryDropdown
      classes="input "
      name=""
      defaultOptionLabel="Choisir la nationalité du Représentant légal"
      value={nationality}
      valueType="short"
      onChange={(val) => this.selectNationality(val)} />
      <CountryDropdown
      name=""
      defaultOptionLabel="Choisir le pays de résidence du Représentant légal"
      value={country}
      valueType="short"
      onChange={(val) => this.selectCountry(val)} />
      <Button type="submit">
      Envoyer
      </Button>
      </Form>
  );

  }
}
