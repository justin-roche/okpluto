"use strict";

var socket = null;

const createSocket = function() {
  socket = io.connect('http://localhost:8080');
  
  socket.on('connect', function(data) {
    var dbId = localStorage.getItem('mongoUserId');
    console.log('socket connected');
    console.log('emitting newAvailableUser', dbId);
    
    //send new available user event to server so it can emit to all users and they 
    //update their 'chat available' display for the user
    socket.emit('onlineUser', {sender: dbId});
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
  socket.on('onlineUsers', function(data){
    console.log('new available user from socket', data);
    data.users.forEach(function(user){
      callback(user);
    });
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