"use strict";

import React from 'react';
//Required for Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
//Material-UI components used within this form
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MeetupCreation from './meetupCreation.jsx';
import ChatCreation from './chatCreation.jsx';
import Snackbar from 'material-ui/Snackbar';
import * as Colors from 'material-ui/styles/colors';
//Services
import eventServices from '../services/eventServices.js';
import chatServices from '../services/chatServices.js';

class ChatDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      errorText: {},
      creator: this.props.userInfo._id,
      //Target user and creator automatically added to attendees
      attendees: [this.props.userInfo._id, this.props.userId],
      category: 'Dog Park',
      snackbar: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    // this.handleOpenChat = this.handleOpenChat.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleSend(){
    debugger;
    console.log('sending message');
  }

  handleOpen() {
    this.setState({open: true});
  }

  // handleOpenChat() {
  //   this.setState({open: true})
  // }

  handleClose() {
    console.log('handling close');
    this.setState({open: false});
  }

  handleSnackbarClose() {
    this.setState({snackbar: false});
  }

  validate(values) {
    const errors = {};
    const requiredFields = [ 'eventname', 'where', 'date', 'time' ];
    requiredFields.forEach(field => {
      //Checks if any of the requiredFields don't have a value
      if (!values[field].value) {
        errors[field] = 'Required';
      }
    });
    //Checks if lat and lng are null - means a valid location was not chosen
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
    console.log('handling submit');
    //Validates the events form
    //let errors = this.validate(events);
    //let handleClose = this.handleClose;
    //If there's no errors found
    //if (Object.keys(errors).length === 0) {
      //Save the event to the db
      
    //}
    //this.setState({"errorText": errors});
  }

  handleChange(prop, newValue) {
    var change = {};
    change[prop] = newValue;
    this.setState(change);
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Send"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />
    ];



    //autoScrollBodyContent within Dialog is super important when you're wondering why all of your form fields are not showing up
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <div>
          <RaisedButton
            onTouchTap={this.handleOpen}
            label="Let's Chat!"
            primary={true}
          />

          <Dialog
            title="Chat Area"
            titleStyle={{textAlign: 'center'}}
            actions={actions}
            modal={true}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
            autoDetectWindowHeight={true}
          >
            <div className="middle">
<<<<<<< 2641eb2fa036beea5a6afb4cc7ecbf51dd307819
              <form name="chat">
                <ChatCreation />
                <RaisedButton
                onTouchTap = {console.log('sent')}
                label = "Send"
                />
                </form>
=======
              
>>>>>>> send button does stuff
            </div>
          </Dialog>
          <Snackbar
            bodyStyle={{background: Colors.blueGrey600}}
            open={this.state.snackbar}
            message="Event created successfully"
            autoHideDuration={3000}
            onRequestClose={this.handleSnackbarClose}
          />



        </div>

      </MuiThemeProvider>
    )
  }
}

module.exports = ChatDialog;