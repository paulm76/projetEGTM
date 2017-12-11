'use strict';

import React from 'react';
import { Link } from 'react-router';
import mysql from 'mysql';
import Form from '../Form';
import { Input, Button, TextArea,  Select, Checkbox } from 'semantic-ui-react';
import TeamView from './TeamView'


const TeamPage = ({match}) => {
  return(<TeamView id={match.params.teamid} />)
}

export default TeamPage;