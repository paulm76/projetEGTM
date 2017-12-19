import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PageNotFound from '../PageNotFound';
import Navigation from '../Navigation';
import FrontPage from '../FrontPage';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import GainSimulator from '../GainSimulator';
import TeamPage from '../TeamPage';
import RoomPage from '../RoomPage';
import EscapePage from '../EscapePage';
import Footer from '../Footer';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';

import * as mysql from 'mysql';


import './index.css';

const HN_URL = 'http://hn.algolia.com/api/v1/search';

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
          <Navigation />

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

            <Route
              exact path={routes.SIGN_UP}
              component={SignUpPage}
            />
            <Route
              exact path={routes.SIGN_IN}
              component={SignInPage}
            />
            <Route
              exact path={routes.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route
              exact path={routes.ACCOUNT}
              component={AccountPage}
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
            <Route component={PageNotFound}/>
          </ Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

//export default withAuthentication(App);
export default App;