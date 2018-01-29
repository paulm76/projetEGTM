import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import * as routes from '../../constants/routes';
import ValidTeam from '../ValidTeam';
import CurrentTeam from '../CurrentTeam';
import OldTeam from '../OldTeam';
import UserList from '../UserList';

export default class AdminPanel extends Component {

  constructor(props) {
    super(props);

    this.state={
      onglet:'ValidTeam',
      data:'',
    }

    this.validTeam = this.validTeam.bind(this);
    this.updateOnglet = this.updateOnglet.bind(this);
  }

  validTeam(){
    var headers = new Headers();
    var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
    fetch('http://localhost:3001/validTeam', init).then(res => res.json()).then(users => this.setState({ data: users, }));
  }

  updateOnglet(event){
    this.setState({ onglet: event.target.id });
  }

  componentDidMount() {

  }

  render() {
    if (this.state.onglet === 'ValidTeam'){
      return(
        <div>
          <div style={{ display: 'flex' }}>
            <h2 style={{ marginTop: '20px' }}><Button id="ValidTeam" onClick ={ (event) => this.updateOnglet(event) }>Valider les equipes</Button></h2>
            <h2 style={{ marginTop: '20px' }}><Button id="CurrentTeam" onClick={ (event) => this.updateOnglet(event) }>Equipes en cours</Button></h2>
            <h2 style={{ marginTop: '20px' }}><Button id="OldTeam" onClick={ (event) => this.updateOnglet(event) }>Equipes passées</Button></h2>
            <h2 style={{ marginTop: '20px' }}><Button id="UserList" onClick={ (event) => this.updateOnglet(event) }>Liste des utilisateurs</Button></h2>
          </div>
          <div>
            <ValidTeam />
          </div>
        </div>
      );
    } else if (this.state.onglet === 'CurrentTeam'){
      return(
        <div>
          <div style={{ display: 'flex' }}>
            <h2 style={{ marginTop: '20px' }}><Button id="ValidTeam" onClick ={ (event) => this.updateOnglet(event) }>Valider les equipes</Button></h2>
            <h2 style={{ marginTop: '20px' }}><Button id="CurrentTeam" onClick={ (event) => this.updateOnglet(event) }>Equipes en cours</Button></h2>
            <h2 style={{ marginTop: '20px' }}><Button id="OldTeam" onClick={ (event) => this.updateOnglet(event) }>Equipes passées</Button></h2>

            <h2 style={{ marginTop: '20px' }}><Button id="UserList" onClick={ (event) => this.updateOnglet(event) }>Liste des utilisateurs</Button></h2>
          </div>
          <div>
            <CurrentTeam />
          </div>
        </div>
      );

    } else if (this.state.onglet === 'OldTeam'){
      return(
        <div>
          <div style={{ display: 'flex' }}>
            <h2 style={{ marginTop: '20px' }}><Button id="ValidTeam" onClick ={ (event) => this.updateOnglet(event) }>Valider les equipes</Button></h2>
            <h2 style={{ marginTop: '20px' }}><Button id="CurrentTeam" onClick={ (event) => this.updateOnglet(event) }>Equipes en cours</Button></h2>
            <h2 style={{ marginTop: '20px' }}><Button id="OldTeam" onClick={ (event) => this.updateOnglet(event) }>Equipes passées</Button></h2>
            <h2 style={{ marginTop: '20px' }}><Button id="UserList" onClick={ (event) => this.updateOnglet(event) }>Liste des utilisateurs</Button></h2>
          </div>
          <div>
            <OldTeam />
          </div>
        </div>
      );

    } else if (this.state.onglet === 'UserList'){
      return(
        <div>
          <div style={{ display: 'flex' }}>
            <h2 style={{ marginTop: '20px' }}><Button id="ValidTeam" onClick ={ (event) => this.updateOnglet(event) }>Valider les equipes</Button></h2>
            <h2 style={{ marginTop: '20px' }}><Button id="CurrentTeam" onClick={ (event) => this.updateOnglet(event) }>Equipes en cours</Button></h2>

            <h2 style={{ marginTop: '20px' }}><Button id="OldTeam" onClick={ (event) => this.updateOnglet(event) }>Equipes passées</Button></h2>

            <h2 style={{ marginTop: '20px' }}><Button id="UserList" onClick={ (event) => this.updateOnglet(event) }>Liste des utilisateurs</Button></h2>
          </div>
          <div>
            <UserList />
          </div>
        </div>
      );
    }
  }
}
