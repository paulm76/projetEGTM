import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PageNotFound from '../PageNotFound';
import Navigation from '../Navigation';
import FrontPage from '../FrontPage';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import CreateTeamPage from '../CreateTeam';
import PasswordForgetPage from '../PasswordForget';
import MyAccount from '../MyAccount';
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
import SellCondition from '../SellCondition';
import About from '../About';
import ContactUs from '../ContactUs';
import EscapeGameList from '../EscapeGameList';

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
            <Route
              exact path={routes.CREATE_TEAM}
              component={CreateTeamPage}
              authenticated={this.props.authenticated}
            />
            <PublicRoute
              exact path={routes.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <PrivateRoute
              exact path={routes.ACCOUNT}
              component={MyAccount}
              authenticated={this.props.authenticated}
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

            <Route
              exact path={routes.SELL_CONDITION}
              component={SellCondition}
            />

            <Route 
              exact path={routes.ABOUT}
              component={About}
            />

            <Route 
              exact path={routes.CONTACT}
              component={ContactUs}
            />

            <Route 
              exact path={routes.ESCPAPEGAME}
              component={EscapeGameList}
            />

            <Route component={PageNotFound}/>
          </ Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

const mapState = ({session}) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapState)(App);
