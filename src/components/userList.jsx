"use strict";


var React = require('react');
var UserDisplay = require('./user.jsx')
import Loading from './loading.jsx'

// Row component for each rows
const Row = props => (
  <div className="row">
    {
      props.row.map(user => (
        <div className= "col-md-3">
          <UserDisplay user={user} userInfo={props.userInfo} resetUserInfo={props.resetUserInfo} type='user' dogLikes={props.dogLikes} key={user._id} />
        </div>
      ))
    }
  </div>
)

class UserList extends React.Component {

  constructor(props) {
    super(props);
    console.log('UserList props.userInfo.dogLikes', props.userInfo.dogLikes);
  }

  render() {
    if (this.props.users.length) {

      var users = this.props.users
      var rows = [];
      var row = [];
      // Wrap 4 users in one row
      for (var i = 0; i < users.length; i++) {
        if (i % 4 === 0 && row.length > 0) {
          rows.push(row);
          row = [];
        }
        row.push(users[i]);
        if (i === users.length - 1 && row.length > 0) {
          rows.push(row);
        }
      }

      return (
        <div className = "container userList">
          {
            rows.map(row => (
              <Row row={row} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} dogLikes={this.props.userInfo.dogLikes} key={row} />
            ))
          }
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

module.exports = UserList;
