import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, List, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';
import connection from '../../mysql/mysql';
import mysql from 'mysql';

import * as routes from '../../constants/routes';

const TeamItem = ({
  team,
  isFrontPage,
  isReadingsPage,
}) =>
  <List.Item style={{ width: '25%', 'border-top': 'none', 'padding-top': '5px' }}>
    <List.Content>

      <List.Description as="div">
        <List.Header as="h4">
          {isFrontPage}
          <p>Escape Game : {team.escapeGame}</p>
        </List.Header>
          
      </List.Description>
          <p><br />Room : {team.room} <br />
          Places libres : {team.placesMax - team.placesOccupe}</p>
    </List.Content>
  </List.Item>

export default TeamItem;