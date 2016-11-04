"use strict";

const createSocket = function(user) {
  var socket = io.connect('http://localhost:8080');
  
  socket.on('connect', function(data) {
    console.log('socket connected');
  });
}

module.exports = {
  createSocket: createSocket
}