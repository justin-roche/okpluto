"use strict";

import UserList from './userList.jsx'
import { getEvents } from '../services/eventServices.js'
import NavLoggedIn from './nav-loggedIn.jsx';
import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import MyTheme from '../theme/theme.js';
import EventList from './eventList.jsx'
import { getDistance } from '../services/distanceServices'
import Banner from './banner.jsx';
import Footer from './footer.jsx';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      search: '',
      displayedEvents: [],
      searchSource: []
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    var self = this;
    getEvents()
    .then((events) => {
      //Tracker to match distance to correct event
      var eventDests = [];
      var tracker = 0;
      events.events.forEach(event => {
        if(event.lat && event.lng) {
          event.tracker = tracker;
          tracker++;
          eventDests.push({lat: event.lat, lng: event.lng})
        }
      })
      //Find distance between user and each event
      // getDistance({lat: this.props.userInfo.lat, lng: this.props.userInfo.lng}, eventDests)
      // .then(distances => {
      //   console.log(distances)
      //   events.events.forEach(event => {
      //     if (event.tracker !== undefined && distances[event.tracker].status === "OK") {
      //       event.distance = Number(distances[event.tracker].distance.value)
      //     }
      //   })
      //   // Sort by distance
      //   var noDistInfo = [];
      //   var eventsDistInfo = []
      //   events.events.forEach(event => {
      //     if (event.distance === undefined) {
      //       noDistInfo.push(event)
      //     } else {
      //       eventsDistInfo.push(event)
      //     }
      //   });
      //   eventsDistInfo.sort((a, b) => {
      //     return a.distance < b.distance ? -1 : 1
      //   })
      //   let sortedEvents = eventsDistInfo.concat(noDistInfo)
      let sortedEvents = events.events
        //Set events into state after getting distance
        self.setState({events: sortedEvents})
        self.setState({displayedEvents: sortedEvents})
      // })
      //Set Searchable options
      var searchArray = [];
      events.events.forEach(event => {
        searchArray.push(event.eventname, event.loc)
      })
      self.setState({searchSource: searchArray})
    })
  }

  handleChange(text, userNames) {
    var displayedEvents = this.state.events.filter(event => {
      if(event.eventname && event.loc) {
        for (var key in event) {
          if (event[key] === undefined) {
            event[key] = '';
          }
        }
        var re = new RegExp(text, "gi")
        return event.eventname.match(re) || event.loc.match(re)
      }
    })
    this.setState({displayedEvents: displayedEvents})
  }

  render () {
    return (
      <div>
        <NavLoggedIn auth={this.props.auth} toggleDrawer={this.props.toggleDrawer} />
        <Banner display={'Local Users'}/>
        <div className="row">
          <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
               <AutoComplete style={{marginLeft: '75%'}}
                 floatingLabelText="Search Events"
                 filter={AutoComplete.fuzzyFilter}
                 dataSource={this.state.searchSource}
                 maxSearchResults={5}
                 searchText={this.state.search}
                 onUpdateInput={this.handleChange}
                 onNewRequest={this.handleChange}
               />
          </MuiThemeProvider>
        </div>
        <div className="row" style={{marginBottom: 20}}>
            <EventList events={this.state.displayedEvents} userInfo={this.props.userInfo}/>
        </div>
        <Footer/>
      </div>
    )
  }

}

module.exports = Events;