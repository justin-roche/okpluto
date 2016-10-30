"use strict";


import React from 'react'
import { hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import Paper from 'material-ui/Paper'
import ProfileEditDialog from './profileEditDialog.jsx'

class ProfileDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      height: '220px',
      width: '1220px',
      textAlign: 'center',
      display: 'inline-block',
    };
    return (
      <div>
        <div className="profile-image">
          <img src={this.props.userInfo.profilepic} alt="Pic"/>
        </div> <br/>
        <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
          <div>
            <Paper className="profile-info" zDepth={1} rounded={false}>
              <div className={"profile-header"}><h3> Your Info </h3></div>
              <h4><em>Name:</em> {this.props.userInfo.firstname} {this.props.userInfo.lastname}</h4>
              <h4><em>Location:</em> {this.props.userInfo.loc}</h4>
            </Paper> <br/>
            <div className="profile-image">
              <img src={this.props.userInfo.picLink} alt="Pic"/>
            </div> <br/>
            <Paper className="profile-info" zDepth={1} rounded={false}>
              <div className={"profile-header"}><h3> Your Pup's Info </h3></div>
              <h4><em>Name:</em> {this.props.userInfo.dogname}</h4>
              <h4><em>Breed:</em> {this.props.userInfo.dogBreed}</h4>
              <h4><em>Age:</em> {this.props.userInfo.dogAge}</h4>
            </Paper> <br/>
            <ProfileEditDialog userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

module.exports = ProfileDisplay;