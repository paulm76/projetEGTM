'use strict';

import React from 'react';
import Credentials from './Credentials';
import AdminPanel from '../AdminPanel';

export default class AdminPage extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      page:'administration',
    }
  }

  handleLogin = () => {
    this.setState({ page:'administration' });
  }

  componentDidMount() {
  }

  render() {
    const page = this.state.page;
    return (
      <div className="admin-page">
        {page==='credentials' && <Credentials  OnLoginValided={this.handleLogin}/>}
        {page==='administration' && <AdminPanel />}
      </div>
    );
  }
}
