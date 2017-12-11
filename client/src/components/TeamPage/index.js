'use strict';

import React, { Component } from 'react';
import TeamView from './TeamView'


class TeamPage extends Component {
	constructor(props) {
    super(props);

    this.state = {
      teams: [],
      teamId: null,
    };

    this.getTeamId = this.getTeamId.bind(this);
  }

  getTeamId() {
  	this.setState({ teamId: this.props.location.query.teamId, });
  }

  componentDidMount() {
    var headers = new Headers();
    var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
    fetch('http://localhost:3001/team?teamId=' + this.state.teamId, init).then(res => res.json()).then(teams => this.setState({ teams: teams, }));
  }

  render() {
  	return(
  	  <TeamView teamId={ this.state.teamId } />
  	);
  }
}

export default TeamPage;