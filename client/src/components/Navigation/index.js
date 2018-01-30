import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { sessionService } from 'redux-react-session';
import jwt from 'jsonwebtoken';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Auth:this.props.authenticated,
      cagnotte:0,
      userid:'',
    };
  }

  componentDidMount() {

    if(this.props.Auth){
      var init = { method: 'GET', mode: 'cors', cache: 'default' };
      sessionService.loadUser().then(user=>this.setState({userid:user.No, authenticated:true}))
      .then(fetch('http://localhost:3001/mangopay/getCagnotte?userid=' + this.state.userid, init).then(blob => blob.json()).then(cagnotte =>  this.setState({ cagnotte: cagnotte, }))
)

    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({Auth:nextProps.authenticated})
    if(nextProps.authenticated){
      var init = { method: 'GET', mode: 'cors', cache: 'default' };
      sessionService.loadUser().then(user=>this.setState({userid:user.No, nom:user.nom,prenom:user.prenom, authenticated:true}))
      .then(fetch('http://localhost:3001/mangopay/getCagnotte?userid=' + this.state.userid, init).then(blob => blob.json()).then(cagnotte =>  this.setState({ cagnotte: cagnotte, }))
)    }
  }


  render() {
    const {Auth} = this.state;
  	return(
      <div>
    	  {Auth && <NavigationAuth cagnotte={this.state.cagnotte} />}
        {!Auth && <NavigationNonAuth />}
      </div>
  	);
  }
}

/*

sessionService.loadSession().then(currentSession => {
  const token = currentSession.token
  jwt.verify(token, 'test', function(err, decoded) {
    if(err){console.log(err)}
    if(decoded){
      console.log(decoded)
      return(
        <div>
             <NavigationNonAuth />
        </div>
      )
    }
    else{
      return(
      <div>
           <NavigationNonAuth />
      </div>)
    }
})
}).catch(err => {
return(
<div>
     <NavigationNonAuth />
</div>)
console.log(err)

*/

/*
Navigation.contextTypes = {
  authUser: PropTypes.object,
};
*/
const NavigationAuth = () =>
  <Menu secondary>
    <Menu.Item>
      <Link to={routes.FRONTPAGE}><img src="public/images/logoEscapeTeamUPblanc.png" style={{ height: '60px', width: 'auto', marginRight: '10px' }}/>Escape Team UP</Link>
    </Menu.Item>
    <Menu.Item position="right">
      <Link to={routes.ESCPAPEGAME}>Les escape games</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={routes.TEAMS}>Mes equipes</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={routes.GAIN_SIMULATOR}>Simulateur de gains</Link>
    </Menu.Item>
    <Menu.Item>

      <Link to={routes.ACCOUNT}>Mon compte</Link>
    </Menu.Item>
    <Menu.Item>
      <SignOutButton />
    </Menu.Item>
  </Menu>

const NavigationNonAuth = () =>
  <Menu secondary>
    <Menu.Item>
      <Link to={routes.FRONTPAGE}><img src="public/images/logoEscapeTeamUPblanc.png" style={{ height: '60px', width: 'auto', marginRight: '10px' }}/>Escape Team UP</Link>
    </Menu.Item>
    <Menu.Item position="right">
      <Link to={routes.ESCPAPEGAME}>Les escape games</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={routes.GAIN_SIMULATOR}>Simulateur de gains</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={routes.SIGN_IN}>Se connecter</Link>
    </Menu.Item>
  </Menu>

export default Navigation;
