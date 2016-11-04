"use strict";

import * as Colors from 'material-ui/styles/colors';
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';

class NavLoggedIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const barStyle= {
      position: 'fixed',
      top: '0px'
    }
    const titleStyle = {
      textAlign: 'left',
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 'bold',
      fontSize: 36
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <AppBar
          style={barStyle}
          title={<span style={titleStyle}>Ok Pluto</span>}
          iconElementRight={<FlatButton label="Logout" />}
          onLeftIconButtonTouchTap={this.props.toggleDrawer}
          onRightIconButtonTouchTap={this.props.auth.logout.bind(this)}
        />
      </MuiThemeProvider>
    )
  }
}

module.exports = NavLoggedIn;

/* <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand">Ok Pluto</a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li>
                    <a onClick={() => hashHistory.push('/users')}>Show Users</a>
                </li>
                <li>
                    <a onClick={() => hashHistory.push('/profile')}>My Account</a>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a onClick={this.props.auth.logout.bind(this)}>Log Out</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div> */