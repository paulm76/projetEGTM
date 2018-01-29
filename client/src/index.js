import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import  'react-password-strength/dist/style.css'
import './bootstrap.min.css';


// Add the sessionReducer
const reducer = combineReducers({
  session: sessionReducer
});
const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)));

// Init the session service
const options = { refreshOnCheckAuth: true, redirectPath: '/signin', driver: 'COOKIES' };
sessionService.initSessionService(store, options)
  .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
  .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
