import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../scripts/sessionActions';


const SignOutButton = ({ history, logout }) =>
  <Button
    basic
    onClick={()=>logout(history)}
  >
    Sign Out
  </Button>

const mapDispatch = dispatch => ({
  logout: history => dispatch(logout(history))
});


export default connect(null, mapDispatch)(withRouter(SignOutButton));
