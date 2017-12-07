import React from 'react';
import { List } from 'semantic-ui-react';

import EscapeGameItem from '../EscapeGameItem'

const EscapeGameList = ({
  escapeGames,
}) => 
  <List divided relaxed>
    {escapeGames.map(escapeGame =>
      <EscapeGameItem
        key={escapeGame.objectID}
        escapeGame={escapeGame}
      >
        <EscapeGameHeader escapeGame={escapeGame} />
      </EscapeGameItem>
    )};
  </List>

const EscapeGameHeader = ({ escapeGame }) =>
  <span>
  	<a href={escapeGame.url}>{escapeGame.title}</a>
  </span>

export default EscapeGameList;