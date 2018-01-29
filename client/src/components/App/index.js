import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PageNotFound from '../PageNotFound';
import Navigation from '../Navigation';
import FrontPage from '../FrontPage';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import CreateTeam from '../CreateTeam';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import GainSimulator from '../GainSimulator';
import TeamPage from '../TeamPage';
import RoomPage from '../RoomPage';
import EscapePage from '../EscapePage';
import Footer from '../Footer';
import * as routes from '../../constants/routes';
import AdminPage from '../AdminPage'
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PaymentValid from '../PaymentValid';
import PayOut from '../PayOut';


import './index.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      teamsLoading: false,
      teamsError: null,
    };
  }

  render() {

    return (
      <Router>
        <div className="app">
          <Navigation authenticated={this.props.authenticated} />

          <hr/>
          <Switch>
            <Route
              exact path={routes.FRONTPAGE}
              component={() =>
                <FrontPage
                  { ...this.state }
                />
              }
            />

            <PublicRoute
              exact path={routes.SIGN_UP}
              component={SignUpPage}
              authenticated={this.props.authenticated}
            />
            <Route
              exact path={routes.SIGN_IN}
              component={SignInPage}
              authenticated={this.props.authenticated}
            />
            <PublicRoute
              exact path={routes.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <PrivateRoute
              exact path={routes.ACCOUNT}
              component={AccountPage}
              authenticated={this.props.authenticated}
            />
            <Route
              exact path={routes.GAIN_SIMULATOR}
              component={GainSimulator}
            />
            <Route
              exact path={routes.TEAM_PAGE}
              component={TeamPage}
            />
            <Route
              exact path={routes.ROOM_PAGE}
              component={RoomPage}
            />
            <Route
              exact path={routes.ESCAPE_PAGE}
              component={EscapePage}
            />
            <Route
              exact path={routes.ADMIN_PAGE}
              component={AdminPage}
            />

            <Route
              exact path={routes.PAYMENT_DONE}
              component={PaymentValid}
            />

            <Route component={PageNotFound}/>
          </ Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapState)(App);
