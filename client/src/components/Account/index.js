import React from 'react';
import PropTypes from 'prop-types';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import MyAccount from '../MyAccount'
//import withAuthorization from '../Session/withAuthorization';

const AccountPage = (props, context) =>
  <div>
    <MyAccount />
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

//export default withAuthorization(true)(AccountPage);
export default AccountPage;
