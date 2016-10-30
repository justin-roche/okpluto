'use strict';

import { searchEvents } from '../services/eventServices.js'
import NavLoggedIn from './nav-loggedIn.jsx';
import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService.jsx';
import Auth0Lock from '../../node_modules/auth0-lock';
import ProfileDisplay from './profileDisplay.jsx';
import EventList from './eventList.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import {Tabs, Tab} from 'material-ui/Tabs'
import Banner from './banner.jsx';
import Footer from './footer.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingEvents: [],
      noUpcomingEvents: false,
      pastEvents: [],
      noPastEvents: false,
      createdEvents: [],
      noCreatedEvents: false,
      value: 'a'
    }
  }

  componentDidMount() {
    var self = this;
    searchEvents()
    .then(events => {
      if(!events.attendingEvents.length) {
        self.setState({upcomingEvents: []})
        self.setState({noUpcomingEvents: true})
        self.setState({pastEvents: []})
        self.setState({noPastEvents: true})
      } else {
        let upcoming = [];
        let past = [];
        events.attendingEvents.forEach(event => {
        let date = new Date(event.date.slice(0, 11) + event.time.slice(0, 8))
        if (date > new Date()) {
          upcoming.push(event)
        } else {
          past.push(event)
        }
        })
        if (upcoming.length) {
          self.setState({upcomingEvents: upcoming})
        } else {
          self.setState({upcomingEvents: []})
          self.setState({noUpcomingEvents: true})
        }
        if (past.length) {
          self.setState({pastEvents: past})
        } else {
          self.setState({pastEvents: []})
          self.setState({noPastEvents: true})
        }
      }
      if(!events.createdEvents.length) {
        self.setState({createdEvents: []})
        self.setState({noCreatedEvents: true})
      } else {
        self.setState({createdEvents: events.createdEvents})
      }
    })
  }

  handleChange(value) {
    this.setState({
      value: value
    })
  }

  render () {

    return (
      <div>
        <NavLoggedIn auth={this.props.auth} toggleDrawer={this.props.toggleDrawer}/>
        <Banner display="Your Profile"/>
        <div className="container" style={{marginBottom: 20}}>
          <div className="col-md-3 profile">
            <ProfileDisplay userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo}/>
          </div>

          <div className="col-md-9 profile-events">
            <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)} >
              <Tabs
                style={{backgroundColor: 'whitesmoke', paddingBottom: '8px'}}
                value={this.state.value} >
                <Tab label="Upcoming Events" value='a' onActive={() => this.handleChange('a') }>
                  <div>
                    <EventList type="profile" events={this.state.upcomingEvents} noEvents={this.state.noUpcomingEvents} userInfo={this.props.userInfo}/>
                  </div>
                </Tab>
                <Tab label="Created by Me" value='b' onActive={() => this.handleChange('b') }>
                  <div>
                    <EventList type="profile" events={this.state.createdEvents} noEvents={this.state.noCreatedEvents} userInfo={this.props.userInfo}/>
                  </div>
                </Tab>
                <Tab label="past Events" value='c' onActive={() => this.handleChange('c') }>
                  <div>
                    <EventList type="profile" events={this.state.pastEvents} noEvents={this.state.noPastEvents} userInfo={this.props.userInfo}/>
                  </div>
                </Tab>
              </Tabs>
            </MuiThemeProvider>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

Profile.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
};

module.exports = Profile;