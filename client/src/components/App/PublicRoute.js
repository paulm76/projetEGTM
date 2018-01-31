import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component, exact = false, path, authenticated }) => (
  <Route
    exact={exact}
    path={path}
    render={props => (
      !authenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}
  />
);

export default PublicRoute;
