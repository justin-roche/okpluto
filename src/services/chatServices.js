"use strict";

var socket = null;

const createSocket = function() {
  socket = io.connect('http://localhost:8080');
  
  socket.on('connect', function(data) {
    //var dbId = localStorage.getItem('mongoUserId');
    console.log('user id is:', dbId);
    console.log('socket connected');
  });

  socket.on('message',function(data){
    console.log('message received',data);
  });

}

const requestChat = function(targetId){
  var dbId = localStorage.getItem('mongoUserId');
  socket.emit('requestChat',{
    sender: dbId,
    receiver: targetId,
  });
}

//the following are listeners registered from components which change their props
//in a callback registered here to trigger on socket events

//this sends messages to chat dialog component
const registerMessageDisplay = function(callback){
  socket.on('message', function(data){
    callback(data);
  });
}

//this sends user ids to the card components that display if users are online
const registerAvailableDisplay = function(callback){
  socket.on('newAvailableUser', function(data){
    console.log('new available user from socket', data);
    callback(data);
  });
}

//
const registerChatOpen = function(callback){
  socket.on('requestChat', function(data){
    console.log('chat requested',data);
    callback(data);
  });
}

module.exports = {
  createSocket: createSocket,
  registerChatOpen: registerChatOpen,
  registerAvailableDisplay: registerAvailableDisplay,
  requestChat: requestChat,
}