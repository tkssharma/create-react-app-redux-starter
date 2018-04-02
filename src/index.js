import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { reducer as formReducer } from 'redux-form';
import HomePageContainer from './containers/HomePageContainer';
import SignInPage from './components/SignInPage';
import {LandingPage} from './components/LandingPage';

import { AUTH_SIGNIN } from './actions';
import authReducer from './reducers/authReducer';
import App from './components/App';
import { Provider } from 'react-redux';
import './main.css'
const token = localStorage.getItem('token');


const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
  }),
  {}, // initial state
  compose(
      applyMiddleware(),
      // If you are using the devToolsExtension, you can add it here also
      window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);

if (token) {
  // We need to update application state if the token exists
  store.dispatch({ type: AUTH_SIGNIN });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" component={App}>
      <IndexRoute component={HomePageContainer} />
      <Route path="/form" component={SignInPage} />
      <Route path="/landing" component={LandingPage} />
      </Route>
    </Router>
    </Provider>,
  document.getElementById('root')
);
