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
/*
  componentDidMount(){
    const team = this.props;
    this.setState({team});
  }
*/
  render(){

    const {team} = this.props;
    var minutes = team.Date.substring(14,16);
    var hours = team.Date.substring(11,13);
    var day = team.Date.substring(8,10);
    var month = team.Date.substring(5,7);
    var itemStyle = { width: '200px', borderTop: 'none', paddingTop: '5px', marginRight: '10px' }
    var contentStyle = { backgroundImage: "url('" + team.Photo + "')", backgroundSize: '200px auto', backgroundRepeat: 'no-repeat', color:'white' };
    var headerStyle = { color: 'white' }

    return(
  <List.Item style={ itemStyle }>
    <List.Content style={ contentStyle }>

      <List.Description as="div">
        <List.Header as="h4" style={ headerStyle }>
          <p>{team.Room}</p>
        </List.Header>
          
      </List.Description>
          <p><br />
            {team.Nb_places_max - team.Nb_joueur} places restantes<br />
            Le {day}/{month} à {hours}:{minutes}
          </p>
    </List.Content>
  </List.Item>);
  }
}
export default TeamItem;