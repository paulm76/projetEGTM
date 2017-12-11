import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, List, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';
import mysql from 'mysql';

import * as routes from '../../constants/routes';

const INITIAL_STATE = {
  team: '',
  isFrontPage: '',
};

class TeamItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  render(){

    const {team} = this.props;
    var minutes = team.Date.substring(14,16);
    var hours = team.Date.substring(11,13);
    var day = team.Date.substring(8,10);
    var month = team.Date.substring(5,7);
    var itemStyle = { width: '270px', height: '120px', borderTop: 'none', paddingTop: '5px', marginLeft: '20px' }
    var contentStyle = { backgroundImage: "url('" + team.Photo + "')", backgroundSize: '270px 120px', backgroundRepeat: 'no-repeat', color:'white' };
    var headerStyle = { color: 'white' }

    return(
  <List.Item style={ itemStyle }>
    <Link to={'/team?teamId=$team.$team.id'}>
      <List.Content style={ contentStyle }>

        <List.Description as="div">
          <List.Header as="h3" style={ headerStyle }>
            <p>&nbsp;&nbsp;{team.Room}</p>
          </List.Header>
            
        </List.Description>
            <p><br /><strong>
              &nbsp;&nbsp;&nbsp;&nbsp;{team.Nb_places_max - team.Nb_joueur} places restantes<br />
              &nbsp;&nbsp;&nbsp;&nbsp;Le {day}/{month} à {hours}:{minutes}
            </strong></p>
      </List.Content>
    </Link>
  </List.Item>);
  }
}
export default TeamItem;