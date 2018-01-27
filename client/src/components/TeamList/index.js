import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

import TeamItem from '../TeamItem';

import mysql from 'mysql';

class TeamList extends Component {
  constructor(props){
    super(props);

    this.state = {
      teams: [],
    }
  }

  render(){
    if (this.state.teams == ''){
      if (this.props.teams != ''){
        this.setState({ teams: this.props.teams });
        //this.props.onTeamUpdate(this.state.teams);
      }
      return (<p></p>);
    } else {
      return(
        <List divided relaxed>
          {this.state.teams.map(team =>
            <TeamItem
              key={team.objectID}
              team={team}
            >
              <TeamHeader team={team} />
            </TeamItem>
          )}
        </List>
      );
    }
  }
}

const TeamHeader = ({ team }) =>
  <span>
    <p>{team.nom}</p>
  </span>


export default TeamList;