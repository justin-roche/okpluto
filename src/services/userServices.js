"use strict";

import Promise from 'bluebird';

// ajax call to get latitude and longitude of an address
const getLatLng = function(address) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'api/geocode?loc=' + address,
      type: 'GET',
      success: resolve,
      error: reject
    });
  });
};

// Update user info
const updateDb = function(newProps) {
  console.log('updating db with newProps', newProps);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'api/users',
      type: 'PUT',
      data: newProps,
      success: resolve,
      error: reject
    });
  });
};

// Add latitude and longitude values then make ajax call to update user info
const updateUser = function(newProps) {
  newProps.dbId = localStorage.getItem('mongoUserId');
  return new Promise((resolve, reject) => {
    if (newProps.loc) {
      getLatLng(newProps.loc)
        .then(function(results) {
          newProps.lat = results.lat;
          newProps.lng = results.lng;
          console.log('calling updateDb from updateUser');
          updateDb(newProps)
          .then(resolve)
        });
    } else {
      updateDb(newProps)
      .then(resolve)
    }
  })
};

// Get all users from db
const getUsers = function() {
  return new Promise((resolve, reject) => {
    console.log('getting all users');
    $.ajax({
      url: 'api/users',
      type: 'GET',
      success: resolve,
      error: reject
    });
  });
}

//POST to API to get mongoDB user info
const saveUser = function(idToken) {
  console.log('savUser by idToken', idToken);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/signin',
      type: 'POST',
      data: {id: idToken},
      success: resolve,
      error: reject
    });
  });
}

// Get current user's info from db
const findUser = function(dbId) {
  console.log('finding User in db by dbId')
  dbId = dbId || localStorage.getItem('mongoUserId');
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `api/users?dbId=${dbId}`,
      type: 'GET',
      success: resolve,
      error: reject
    });
  });
}

// Delete a user
const deleteUser = function(dbId) {
  dbId = dbId || localStorage.getItem('mongoUserId');
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'api/users',
      type: 'DELETE',
      data: {dbId: dbId},
      success: resolve,
      error: reject
    })
  })
};

// like / unlike other users
const likeUser = (userId, friendId, like) => {
  userId = userId || localStorage.getItem('mongoUserId');
  return new Promise((resolve, reject) => {
    if (like === true) {
      var data = {};
      data.userId = userId;
      data.friendId = friendId;
      $.ajax({
        url: 'api/users/like',
        type: 'PUT',
        data: data,
        success: resolve,
        error: reject
      });
    }
    if (like === false) {
      var data = {};
      data.userId = userId;
      data.friendId = friendId;
      $.ajax({
        url: 'api/users/like',
        type: 'DELETE',
        data: data,
        success: resolve,
        error: reject
      });
    }
  });
};

module.exports = {
  getLatLng: getLatLng,
  updateDb: updateDb,
  getUsers: getUsers,
  saveUser: saveUser,
  findUser: findUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  likeUser: likeUser
};