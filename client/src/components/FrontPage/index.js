'use strict';

import React, { Component } from 'react';
import FrontPageView from './FrontPageView'


class FrontPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
    };
  }

  componentDidMount() {
    var headers = new Headers();
    var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
    fetch('http://localhost:3001/', init).then(res => res.json()).then(teams => this.setState({ teams: teams, }));
  }

  render() {
  	return(
  	  <FrontPageView teams={ this.state.teams } />
  	);
  }
}

export default FrontPage;