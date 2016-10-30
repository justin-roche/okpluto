"use strict";

import Promise from 'bluebird'
import { getLatLng } from './userServices.js';

  const getEvents = function () {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/events',
        type: 'GET',
        success: resolve,
        error: reject
      });
    });
  };

  const saveEvent = function (data) {
    data.creator = data.creator || localStorage.getItem('mongoUserId');
    console.log('about to save ', data)
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/events',
        type: 'POST',
        data: {data: JSON.stringify(data)},
        success: resolve,
        error: reject
      });
    });
  };

  const addPerson = function(eventId, userId) {
    userId = userId || localStorage.getItem('mongoUserId')
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/events/add',
        type: 'PUT',
        data: {eventId: eventId, userId: userId},
        success: resolve,
        error: reject
      })
    })
  }

  const searchEvents = function(dbId) {
    dbId = dbId || localStorage.getItem('mongoUserId');
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `api/events?dbId=${dbId}`,
        type: 'GET',
        success: resolve,
        error: reject
      });
    });
  }

  const removePerson = function(eventId, userId) {
    userId = userId || localStorage.getItem('mongoUserId')
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/events/remove',
        type: 'PUT',
        data: {eventId: eventId, userId: userId},
        success: resolve,
        error: reject
      })
    })
  };

  const deleteEvent = function(eventId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/events',
        type: 'DELETE',
        data: {eventId: eventId},
        success: resolve,
        error: reject
      })
    })
  }

module.exports = {
  getEvents: getEvents,
  saveEvent: saveEvent,
  addPerson: addPerson,
  searchEvents: searchEvents,
  removePerson: removePerson,
  deleteEvent: deleteEvent
};