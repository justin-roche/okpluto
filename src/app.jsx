"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import AuthService from './utils/AuthService.jsx';
import { getInfo } from './utils/communication.js';
import $ from 'jquery';
import Home from './components/home.jsx';
//import { auth0 } from '../config/auth0.js';
import UsersPage from './components/usersPage.jsx'
import Container from './components/container.jsx'
import Profile from './components/profile.jsx'
import Events from './components/events.jsx'
import ProfileCreation from './components/profileCreation.jsx'
import Loading from './components/loading.jsx'
import MeetupCreation from './components/meetupCreation.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
//import api from '../config/api.js'
import GoogleMapsLoader from 'google-maps'
import InfoDrawer from './components/infoDrawer.jsx'


getInfo().then(authPath => {
const auth = new AuthService(authPath.auth.AUTH0_CLIENT_ID, authPath.auth.AUTH0_DOMAIN);

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace ({ pathname: '/'})
  }
}

//const passProps = ()
injectTapEventPlugin();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Container} auth={auth}>
      <IndexRoute component={Home} />
      <Route component={InfoDrawer} >
        <Route path="/users" component={UsersPage} onEnter={requireAuth} />
        <Route path="/profile" component={Events} onEnter={requireAuth} creation={false}/>
      </Route>
      <Route path="/creation" component={ProfileCreation} onEnter={requireAuth} creation={true}/>
      <Route path="access_token=:token" component={Loading} />
    </Route>
  </Router>, $('#app')[0]
);
})

