import React, { Component } from 'react';
import { Links } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, List, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';

import * as routes from '../../constants/routes';
//import { db } from '../../mysql';

const EscapeGameRow = styled.div`
  margin: 10px;
  display: flex;
`;

const EscapeGameItem = ({
  escapeGame,
}) => 
  <List.Item>
	<List.Content>

	  <List.Description as="div">
	    <List.Header as="h4">
	      {
	        escapeGame={escapeGame}
	      }

	      <a href={escapeGame.url}>
	        {escapeGame.title}
          </a>
        </List.Header>
      </List.Description>
    </List.Content>
  </List.Item>


export default EscapeGameItem;