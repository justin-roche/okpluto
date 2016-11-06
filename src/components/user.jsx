"use strict";

import React from 'react';
import DialogButton from './dialogButton.jsx';
import ChatButton from './chatButton.jsx';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
<<<<<<< 7567a2c403821cab561eb9c307a93ec01498619e
import userServices from '../services/userServices.js';
=======
import chatServices from '../services/chatServices.js';
>>>>>>> socket deletion in server.js; disables chat for unavailable users on login

class UserDisplay extends React.Component {

  constructor(props) {
    super(props);
<<<<<<< 7567a2c403821cab561eb9c307a93ec01498619e
       
  }

  formatBreedName(breed){
    return breed.split(" ")
      .map((word) => {
        return word.toLowerCase();
      }).join(" ");
  }

  analyzeBreeds(breed){
    let blackList = this.props.userInfo.blackListBreeds;

    if(blackList.indexOf(this.formatBreedName(breed)) === -1){
      return true;
    }

    return false;
=======
    this.state = {
      chatDisabled: true
    }

    var self = this;
    chatServices.listenForOnlineUser(function(dbId){
      if(dbId === self.props.user._id){
        self.setState({chatDisabled: false});
      }
    });

    chatServices.listenForOfflineUser(function(dbId){
      if(dbId === self.props.user._id){
        self.setState({chatDisabled: true});
      }
    });

    this.displayMatch();    
>>>>>>> socket deletion in server.js; disables chat for unavailable users on login
  }

  displayMatch(){
    if(this.analyzeBreeds(this.props.user.dogBreed)){
      console.log(`good breed match from ${this.props.user.dogname}`);
      //display a badmatch image
      return(
        <img src={'https://s-media-cache-ak0.pinimg.com/236x/53/f1/c4/53f1c40a18b3b16e81d15fb06d6a980e.jpg'} />
      )
    }
    //display a good match image
    console.log(`bad breed match from ${this.props.user.dogname}`);
    return(
      <img src={'https://s3.amazonaws.com/kandipatternspatterns/characters/20542_courage-the-cowardly-dog-i-have-a-bad-feeling-about-this-.png'} />
    )
  }

  constructor(props) {
    super(props);
    // this.state = {isLiked: this.props.isLiked};
    this.state = {isLiked: false};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({isLiked: event.target.value});
    userServices.likeUser(this.props.userInfo._id, this.props.user._id, this.state.isLiked);
  }

  render () {
    console.log("user info from user card", this.props.userInfo);
    return (
      <div>
        <Card>
          <CardMedia>
            <input type="checkbox" checked={this.state.isLiked} onChange={this.handleChange} />
            <img src={this.props.user.picLink || this.props.user.profilepic} className="card-img" alt="Pic"/>
          </CardMedia>

          {this.displayMatch()}
          <CardHeader
            title={this.props.user.dogname}
            subtitle={'From: ' + this.props.user.loc}
            avatar={
              <Avatar
                src={this.props.user.profilepic}
                style={{float: 'right', marginTop: -35, marginLeft:20}}>
              </Avatar>
            }
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            <strong>Owner:</strong> {this.props.user.firstname}<br />
            <strong>Age: </strong>{this.props.user.dogAge}<br />
            <strong>Breed: </strong>{this.props.user.dogBreed}<br />
          </CardText>

          <CardActions>
            <DialogButton
              userId={this.props.user._id}
              lat={this.props.user.lat}
              lng={this.props.user.lng}
              type={this.props.type}
              userInfo={this.props.userInfo}
              resetUserInfo={this.props.resetUserInfo}
              toggleDrawer={this.props.toggleDrawer}
            />
            <ChatButton
              chatDisabled={this.state.chatDisabled}
              style={{marginTop: "20px"}}
              userId={this.props.user._id}
              lat={this.props.user.lat}
              lng={this.props.user.lng}
              type={this.props.type}
              userInfo={this.props.userInfo}
              resetUserInfo={this.props.resetUserInfo}
              toggleDrawer={this.props.toggleDrawer}
            />
            
          </CardActions>
        </Card>
      </div>
    )
  }

}
// <ChatButton
//               userId={this.props.user._id}
//               toggleDrawer={this.props.toggleDrawer}
//             />
module.exports = UserDisplay;
