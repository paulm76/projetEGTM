import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import formatePictureName from '../../scripts/formatePictureName.js';

export default class EscapeItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render(){

    const escape = this.props.escape;
    var linkToEscape = escape.Nom.replace(' ','_').replace(' ','_').replace(' ','_').replace(' ','_').replace(' ','_').replace(' ','_');
    var imagePath = formatePictureName(escape.Nom, escape.Nom);
    var itemStyle = { width: '270px', height: '270px', borderTop: 'none', paddingTop: '5px', marginLeft: '20px' };
    var contentStyle = { backgroundImage: "url('" + imagePath + "')", backgroundSize: '270px 270px', backgroundRepeat: 'no-repeat', color:'white', textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black', paddingLeft: '10px' };
    var headerStyle = { color: 'white' };
    return(
      <List.Item style={ itemStyle }>
        <Link to={ linkToEscape }>
          <List.Content style={ contentStyle }>

            <List.Description as="div">
              <List.Header as="h3" style={ headerStyle }>
                <p>&nbsp;&nbsp;{escape.Nom}</p>
              </List.Header>
                
            </List.Description>
              <p><strong>
                &nbsp;&nbsp;&nbsp;&nbsp;{} places restantes<br />
                &nbsp;&nbsp;&nbsp;&nbsp;
              </strong></p>
          </List.Content>
        </Link>
      </List.Item>
    );
  }
}
