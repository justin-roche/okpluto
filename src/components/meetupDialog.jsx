"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MeetupCreation from './meetupCreation.jsx'
import eventServices from '../services/eventServices.js';
import Snackbar from 'material-ui/Snackbar';


class MeetupDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      errorText: {},
      creator: this.props.userInfo._id,
      attendees: [this.props.userInfo._id, this.props.userId],
      category: 'Dog Park',
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  validate(values) {
    const errors = {};
    const requiredFields = [ 'eventname', 'where', 'date', 'time' ];
    requiredFields.forEach(field => {
      if (!values[field].value) {
        errors[field] = 'Required';
      }
    });
    if (!this.state.lat || !this.state.lng) {
      errors.where = 'Please enter a valid location';
    }
    if (!this.state.category) {
      errors.category = 'Required';
    }
    return errors;
  }

  handleSubmit() {
    var self = this;
    let errors = this.validate(events);
    let handleClose = this.handleClose;
    if (Object.keys(errors).length === 0) {
      eventServices.saveEvent(this.state)
        .then(function (data){
          console.log('Data: ', data);
          handleClose();
          self.setState({submitted: true });
        });
    }
    this.setState({"errorText": errors});
  }

  handleChange(prop, newValue) {
    var change = {};
    change[prop] = newValue;
    this.setState(change);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Create Event"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />
    ]

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <div>
          <RaisedButton onTouchTap={this.handleOpen} label="Let's Meetup!" primary={true}/>
          <Dialog title="Meetup Creation" titleStyle={{textAlign: 'center'}} actions={actions} modal={true} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true} autoDetectWindowHeight={true}>
            <div className="middle">
              <form name="events">
              <MeetupCreation lat={this.props.lat} lng={this.props.lng} targetUser={this.props.userId} change={this.handleChange} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} errorText={this.state.errorText}
              />
            </form>
            </div>
          </Dialog>
          <Snackbar
            open={this.state.submitted}
            message="Event created successfully"
            autoHideDuration={3000}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

module.exports = MeetupDialog;