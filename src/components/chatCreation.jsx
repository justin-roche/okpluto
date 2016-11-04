"use strict";

import React from 'react';
//Required for Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
//Material-UI components used within this form
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
//Function to be needed
import { findUser } from '../services/userServices.js'
//chatServices
import chatServices from '../services/chatServices.js';


class ChatCreation extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    findUser(this.props.targetUser)
    .then((user) => {
      //For eventname field hintText
      this.setState({'friendName': user.firstname});
      this.setState({'friendDogName': user.dogname});
    })
  }


  render() {
    const styles = {
      height: '250px',
      width: '400px'
    }

    const chatOptions = [
      <FlatButton
        label="Close Chat"
        primary={true}
        // onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Send"
        primary={true}
        keyboardFocused={true}
        // onTouchTap={this.handleSubmit}
      />
    ];

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <div>
          <RaisedButton
            // onTouchTap={this.handleOpen}
            label="Let's Chat!"
            primary={true}
          />

          <Dialog
            title="Chat Area"
            titleStyle={{textAlign: 'center'}}
            actions={chatOptions}
            modal={true}
            // open={this.state.open}
            // onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
            autoDetectWindowHeight={true}
          >

          <div className="middle">
            <form name="events">

            </form>
          </div>
          </Dialog>
          <TextField
            floatingLabelText="Say Something"
            name="chat"
            errorText={this.props.errorText.eventname}
            // onChange={}
            style={{width: 400}} />
          <br />
        </div>
      </MuiThemeProvider>
    )
  }
}

module.exports = ChatCreation;