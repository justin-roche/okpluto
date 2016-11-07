// "use strict";

// import React from 'react';
// //Required for Material-UI
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MyTheme from '../theme/theme.js';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
// import Dialog from 'material-ui/Dialog';
// //Material-UI components used within this form
// import TextField from 'material-ui/TextField';
// import MenuItem from 'material-ui/MenuItem';
// import SelectField from 'material-ui/SelectField';
// //Function to be needed
// import { findUser } from '../services/userServices.js'
// //chatServices
// import chatServices from '../services/chatServices.js';


// class ChatCreation extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//       errorText: {},
//       // creator: this.props.userInfo._id,
//       //Target user and creator automatically added to attendees
//       // attendees: [this.props.userInfo._id, this.props.userId],
//       category: 'Dog Park',
//       snackbar: false
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleOpen = this.handleOpen.bind(this);
//     this.handleClose = this.handleClose.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.validate = this.validate.bind(this);
//     this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
//     this.handleSend = this.handleSend.bind(this);
//   }

//   handleSend() {
//     console.log('sending message');
//   }

//   handleOpen() {
//     this.setState({open: true});
//   }

//   handleClose() {
//     this.setState({open: false});
//   }

//   handleSnackbarClose() {
//     this.setState({snackbar: false});
//   }

//   validate(values) {
//     const errors = {};
//     const requiredFields = [ 'eventname', 'where', 'date', 'time' ];
//     requiredFields.forEach(field => {
//       //Checks if any of the requiredFields don't have a value
//       if (!values[field].value) {
//         errors[field] = 'Required';
//       }
//     });
//     //Checks if lat and lng are null - means a valid location was not chosen
//     if (!this.state.lat || !this.state.lng) {
//       errors.where = 'Please enter a valid location';
//     }
//     if (!this.state.category) {
//       errors.category = 'Required';
//     }
//     return errors;
//   }

//   handleSubmit() {
//     var self = this;
//     //Validates the events form
//     let errors = this.validate(events);
//     let handleClose = this.handleClose;
//     //If there's no errors found
//     if (Object.keys(errors).length === 0) {
//       //Save the event to the db
//       eventServices.saveEvent(this.state)
//         .then(function (data){
//           //Close the form popup
//           handleClose();
//           //And show the user confirmation that the event was created
//           self.setState({snackbar: true });
//         });
//     }
//     this.setState({"errorText": errors});
//   }

//   handleChange(prop, newValue) {
//     var change = {};
//     change[prop] = newValue;
//     this.setState(change);
//   }


//   componentDidMount() {
//     findUser(this.props.targetUser)
//     .then((user) => {
//       //For eventname field hintText
//       this.setState({'friendName': user.firstname});
//       this.setState({'friendDogName': user.dogname});
//     })
//   }


//   render() {
//     const styles = {
//       height: '250px',
//       width: '400px'
//     }

//     const chatOptions = [
//       <FlatButton
//         label="Close Chat"
//         primary={true}
//         // onTouchTap={this.handleClose}
//       />,
//       <FlatButton
//         label="Send"
//         primary={true}
//         keyboardFocused={true}
//         // onTouchTap={this.handleSubmit}
//       />
//     ];

//     return (
//       <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
//         <div>
//           <RaisedButton
//             // onTouchTap={this.handleOpen}
//             label="Let's Chat!"
//             primary={true}
//           />

//           <Dialog
//             title="Chat Area"
//             titleStyle={{textAlign: 'center'}}
//             actions={chatOptions}
//             modal={true}
//             open={this.state.open}
//             onRequestClose={this.handleClose}
//             autoScrollBodyContent={true}
//             autoDetectWindowHeight={true}
//           >

//           <div className="middle">
//             <form name="events">

//             </form>
//           </div>
//           </Dialog>
//           <TextField
//             floatingLabelText="Say Something"
//             name="chat"
//             // errorText={this.props.errorText.eventname}
//             // onChange={}
//             style={{width: 400}} />
//           <br />
//         </div>
//       </MuiThemeProvider>
//     )
//   }
// }

// module.exports = ChatCreation;