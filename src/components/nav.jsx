"use strict";

import * as Colors from 'material-ui/styles/colors';
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';


class Navigation extends React.Component {

  render () {
    const barStyle= {
      position: 'fixed'
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
          secondary={true}
          title={<span style={titleStyle}>Ok Pluto</span>}
          showMenuIconButton={false}
          iconElementRight={<FlatButton label="Login / Signup" />}
          onRightIconButtonTouchTap={this.props.auth.login.bind(this)}
        />
      </MuiThemeProvider>

    )
  }
}

module.exports = Navigation;

/* <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Ok Pluto</a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                    <a href='#' onClick={this.props.auth.login.bind(this)}>Sign In</a>
                </li>
              </ul>
            </div>
          </div>
        </nav> */