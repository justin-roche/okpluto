"use strict";

import React from 'react';
import UserList from './userList.jsx';
import MeetupCreation from './meetupCreation.jsx'
import MeetupDialog from './meetupDialog.jsx'
import DialogButton from './dialogButton.jsx'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';


class UserDisplay extends React.Component {

  constructor(props) {
    super(props)
  }


  render () {
    if (this.props.type === 'profile') {
      this.user = this.props.userInfo;
    } else {
      this.user = this.props.user;
    }
    return (
      <div>
        <Card>
          <CardMedia>
            <img src={this.user.picLink || this.user.profilepic} className="card-img" alt="Pic"/>
          </CardMedia>
          <CardHeader
            title={this.user.dogname}
            subtitle={'From: ' + this.user.loc}
            avatar={<Avatar src={this.user.profilepic} style={{float: 'right', marginTop: -35, marginLeft:20}}></Avatar>}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <strong>Owner:</strong> {this.user.firstname}<br />
            <strong>Age: </strong>{this.user.dogAge}<br />
            <strong>Breed: </strong>{this.user.dogBreed}<br />
          </CardText>
          <CardActions>
            <DialogButton userId={this.user._id} lat={this.user.lat} lng={this.user.lng} type={this.props.type} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} toggleDrawer={this.props.toggleDrawer} toggleProfile={this.props.toggleProfile}/>
          </CardActions>
        </Card>
      </div>
    )
  }

}

module.exports = UserDisplay;
