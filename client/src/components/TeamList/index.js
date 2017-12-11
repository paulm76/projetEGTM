import React from 'react';
import { List } from 'semantic-ui-react';

import TeamItem from '../TeamItem';

import mysql from 'mysql';

const TeamList = ({
  teams,
  isFrontPage,
  isReadingsPage,
}) =>
  <List divided relaxed>
    {teams.map(team =>
      <TeamItem
        key={team.objectID}
        team={team}
        isFrontPage={isFrontPage}
        isReadingsPage={isReadingsPage}
      >
        <TeamHeader team={team} />
      </TeamItem>
    )}
  </List>

const TeamHeader = ({ team }) =>
  <span>
    <p>{team.nom}</p>
  </span>


export default TeamList;