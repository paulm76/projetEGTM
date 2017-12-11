'use strict';

import React from 'react';
import RoomView from './RoomView'


const RoomPage = ({match}) => {
  return(<RoomView id={match.params.roomid} />)
}

export default RoomPage;