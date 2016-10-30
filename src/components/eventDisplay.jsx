"use strict";

import React from 'react';
import Loading from './loading.jsx'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import { findUser } from '../services/userServices.js'
import { addPerson, removePerson, deleteEvent } from '../services/eventServices.js'

const calendar = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "June",
  6: "July",
  7: "Aug",
  8: "Sept",
  9: "Oct",
  10: "Nov",
  11: "Dec"
}

const eventPics = {
  Trails: "/assets/trails.jpg",
  Beach: "/assets/beach.jpg",
  Park: "/assets/park.jpg",
  'Dog Park': "/assets/dogpark.jpg",
  Something: "/assets/friends.png"
}

class EventDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      attendees: [],
      eventId: this.props.event._id,
      open: false,
      joined: false,
      message: "Joined event successfully"
    };
    this.join = this.join.bind(this);
    this.unjoin = this.unjoin.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleEventButtonClick = this.handleEventButtonClick.bind(this);
  }

  componentWillMount() {
    let self = this;
    findUser(this.props.event.creator)
    .then(user => {
      let name = user.firstname + ' ' + user.lastname
      this.setState({creator: name, creatorDog: user.dogname, pic: user.profilepic})
    });
    let attendees = this.state.attendees;
    this.props.event.attendees.forEach(attendee => {
      if (attendee === this.props.userInfo._id) {
        self.setState({joined: true})
      }
      findUser(attendee)
      .then(person => {
        let people = attendees;
        people.push('\n' + person.firstname)
        this.setState({attendees: people})
      });
    });
    this.setState({eventPic: eventPics[this.props.event.category]});
  }

  join() {
    let eventId = this.state.eventId;
    addPerson(eventId);
    let attendees = this.state.attendees;
    attendees.push(this.props.userInfo.firstname);
    this.setState({attendees: attendees})
      this.setState({
        joined: true,
        message: "Joined event successfully"
      });
    this.setState({open: true});
  }

  unjoin() {
    const self = this
    let attendees = this.state.attendees;
    let index = attendees.indexOf(this.props.userInfo.firstname);
    attendees.splice(index, 1);
    this.setState({attendees: attendees})
    removePerson(this.state.eventId)
    .then(updatedEvent => {
      self.setState({
        joined: false,
        message: "Left event successfully"
      });
      self.setState({open: true});
    })
  }

  getTitle() {
    if (this.props.event.creator === this.props.userInfo._id) {
      return 'Cancel Event'
    }
    return this.state.joined ? 'Leave' : 'Join'
  }

  handleEventButtonClick() {
    let self = this;
    if (this.props.event.creator === this.props.userInfo._id) {
      deleteEvent(this.props.event._id)
      .then(deletedEvent => {
      self.setState({
        joined: false,
        message: `Canceled event ${self.props.event.eventname}`
      });
      self.setState({open: true});
      })
    } else {
      return this.state.joined ? this.unjoin() : this.join()
    }
  }

  handleRequestClose() {
    this.setState({open: false});
  }

  render () {
    const date = new Date(this.props.event.date);
    const time = this.props.event.time.split(':');
    const hours = time[0] > 12 ? time[0] - 12 : time[0];
    const min = time[1];
    const ampm = time[0] >=12 ? 'PM' : 'AM';
    const zone = this.props.event.time.slice(-5);
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
      <Card>
        <CardHeader
          title={this.props.event.eventname}
          subtitle={'At: ' + this.props.event.loc}
          avatar={this.state.pic}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardMedia>
          <img src={this.state.eventPic} />
        </CardMedia>
        <CardText expandable={true}>
          <strong>Creator:</strong> {this.state.creator}<br />
          <strong>Who's going:</strong>{this.state.attendees.map((person, i) => {
            if (i !== this.state.attendees.length - 1) {
              person += ', ';
            }
            return person
          })}<br />
          <strong>When:</strong> {calendar[date.getMonth()]} {date.getDate()} at {hours}:{min} {ampm} {zone}
        </CardText>
        <CardActions>
          <FlatButton label={this.getTitle()} onClick={this.handleEventButtonClick}/>
          <Snackbar
            open={this.state.open}
            message={this.state.message}
            autoHideDuration={3000}
            onRequestClose={this.handleRequestClose}
          />
        </CardActions>
      </Card>
      </MuiThemeProvider>
    )
  }
}

module.exports = EventDisplay;