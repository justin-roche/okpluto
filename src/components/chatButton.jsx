/*
  This file contains the component for the DialogButton! Used within user.jsx
*/

import React from 'react'
import ChatDialog from './chatDialog.jsx'

class ChatButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ChatDialog userId={this.props.userId} lat={this.props.lat} lng={this.props.lng} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo}
      />
    )
  }
}

module.exports = ChatButton;