"use strict";

import React from 'react';
import DialogButton from './dialogButton.jsx';
import ChatButton from './chatButton.jsx';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import userServices from '../services/userServices.js';
import chatServices from '../services/chatServices.js';

class UserDisplay extends React.Component {

  constructor(props) {
    super(props);
    const isLiked = props.user.dogLikes.reduce(friend => { return friend == props.userInfo._id; }, false);
    this.state = {
      isLiked: isLiked,
      chatDisabled: true,
      chatLabel: "offline",
    }

    var self = this;
    chatServices.listenForOnlineUser(function(dbId){
      if(dbId === self.props.user._id){
        self.setState({chatDisabled: false});
        self.setState({chatLabel: "Let's chat!"});
      }
    });

    chatServices.listenForOfflineUser(function(dbId){
      if(dbId === self.props.user._id){
        self.setState({chatDisabled: true});
        self.setState({chatLabel: "offline"});
      }
    });

    this.displayMatch();
    this.handleChange = this.handleChange.bind(this);
  }

  formatBreedName(breed) {
    return breed.split(" ")
      .map((word) => {
        return word.toLowerCase();
      }).join(" ");
  }

  analyzeBreeds(breed) {
    let blackList = this.props.userInfo.blackListBreeds;

    if(blackList.indexOf(this.formatBreedName(breed)) === -1){
      return true;
    }

    return false;
  }

  // getInitialState() {
  //       return {
  //           chatDisabled: true
  //       };
  //   }

  displayMatch() {
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

  handleChange(event) {
    this.setState({isLiked: event.target.checked}, () => {
      userServices.likeUser(this.props.userInfo._id, this.props.user._id, this.state.isLiked);
    });
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
              chatLabel={this.state.chatLabel}
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
