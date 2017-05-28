var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

connections =  [];

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket, req, res){
	console.log('a user Connected');
	connections.push(socket);
	console.log('Connected: %s sockets Connected', connections.length);

	socket.on('disconnect', function(){
    console.log('user disconnected');
    connections.splice(connections.indexOf(socket),1);
	console.log('Disconnected: %s sockets Connected', connections.length);
  });

});

var api = require('./api');
app.use(api);

server.listen(3000, function(){
	console.log('running on port*:3000');
});