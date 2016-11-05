'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var httpServer = require('http').createServer(app);
//socket.io requires httpServer; current version of express 
//is actually just middleware anyway

var io = require('socket.io')(httpServer);

// setting port
var port = process.env.PORT || 8080;


// config files
var db = require('./config/db');

// serving static files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req,res,next)=> {
  console.log(`${req.method} AT ${req.url}`)
  next();
});
//Route queries searches for db
app.use((req, res, next) => {
  if (req.query.dbId) {
    if (req.path === '/api/users') {
      //changes search for all users to search for one user if there is a dbId provided
      console.log('changing req.path from /api/users to /query/dbId')
      req.url = '/query/dbId';
    } else if (req.path === '/api/events') {
      //getting events for one user
      console.log('changing req.path from /api/events to /queryEvents/dbId');
      req.url = '/queryEvents/dbId'
    }
  }
  next();
})

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));

// routes
require('./app/routes/routes')(app)

httpServer.listen(port, function() {
	console.log('server running! :)');
})

var usersTable = {};
io.on('connection', function(client) { 
    var socketId = client.id; 
    console.log('socket connection, client ID', socketId);

    //extract all available users for the initial render and send as array to
    //newly connected client
    var onlineUsers = Object.keys(usersTable).map(function(dbId){
      return dbId; 
    });
    io.to(socketId).emit('usersOnline', JSON.stringify({users: onlineUsers}));

    client.on('onlineUser',function(data){
      //extract sender id and save id prop to usersTable
      usersTable[data.sender] = socketId; 
      console.log('user saved to userstable', usersTable);
      io.emit('usersOnline',JSON.stringify({users: data.sender}));
    });

    client.on('requestChat', function(data) {
      console.log('sending request chat, data:', data)
      console.log('target socketId is', usersTable[data.receiver]);
      io.to(usersTable[data.receiver]).emit('requestChat', JSON.stringify(data.sender));
    });

    //the data for the partner match is included from the client
    client.on('message', function(data) {
      console.log('sending message',data);
      console.log('reciever socketid', usersTable[data.receiver]);
      io.to(usersTable[data.receiver]).emit('message',JSON.stringify(data.message));
    });

});


exports = module.exports = app; // expose our app

  