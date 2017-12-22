'use strict';

import React from 'react';
import Credentials from './Credentials';
import UserList from './UserList';

export default class AdminPage extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      page:'credentials',
    }
  }

  handleLogin = () => {
        this.setState({page:'user'});
    }

  componentDidMount() {
  }

  render() {
    const page = this.state.page;
    return (
      <div className="admin-page">
      {page!=='credentials' && <a onClick={(event)=>this.setState({ page: 'user' })}>Utilisateur</a>}
        {page==='credentials' &&<Credentials  OnLoginValided={this.handleLogin}/>}
        {page==='user' && <UserList />}

      </div>
    );
  }
}
