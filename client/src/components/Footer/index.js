import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import * as routes from '../../constants/routes';

const Footer = () =>
  <Menu secondary>
    <Menu.Item position="right">
      <Link to={routes.SELL_CONDITION}>Conditions de vente</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={routes.ABOUT}>A propos</Link>
    </Menu.Item>
    <Menu.Item position="left">
      <Link to={routes.CONTACT}>Nous contacter</Link>
    </Menu.Item>
  </Menu>

export default Footer;