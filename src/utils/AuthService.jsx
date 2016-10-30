"use strict";

import Auth0Lock from 'auth0-lock';
import { hashHistory } from 'react-router'
import userServices from '../services/userServices.js'
const Logo = '/assets/logo.png';

export default class AuthService {
  constructor(clientId, domain) {
    //Set custom signup fields
    var options = {
      additionalSignUpFields: [{
        name: "given_name",
        placeholder: "First Name",
        validator: function(name) {
          return {
            valid: name.length >= 2
          }
        }
      },
      {
        name: "family_name",
        placeholder: "Last Name",
        validator: function(name) {
          return {
            valid: name.length >= 2
          }
        }
      }],

      languageDictionary: {
        title: "Ok Pluto"
      },

      theme: {
        logo: Logo,
        primaryColor: 'rgb(0, 77, 64)'
      },

      socialButtonStyle: 'small'
    }

    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, options)
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
    // binds signup functions
    this.signup = this.signup.bind(this);
  }

  _doAuthentication(authResult){
    //clear local storage
    localStorage.removeItem('id_tokenx537?');
    localStorage.removeItem('mongoUserId');
    // Saves the user token
    this.setToken(authResult.idToken)
    //Save user in site DB, or create in site DB
    var self = this;
    userServices.saveUser(authResult.idToken)
    .then(user => {
    //Redirect to users or profile completion after login
      user.creation ? hashHistory.push('/creation') : hashHistory.push('/users')
      // Set DB Id into local storage for later ajax calls to DB
      self.setDBId(user.user._id)
    })
  }

  login() {
    // Call the show method to display the widget, turning both login and signup on
    this.lock.show({allowLogin : true, allowSignUp: true});
  }

  signup() {
    // only show signup
    this.lock.show({allowLogin : false, allowSignUp: true});
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_tokenx537?', idToken)
  }

  setDBId(id) {
    // Saves mongoDB user id to localStorage
    localStorage.setItem('mongoUserId', id);
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_tokenx537?')
  }

  getDBId(){
    // Retrieves the mongoDB user token from localStorage
    return localStorage.getItem('mongoUserId')
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_tokenx537?');
    localStorage.removeItem('mongoUserId');
    hashHistory.push('/')
  }


}