var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/frontend'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');	
});

io.on('connection', function(socket){
	console.log("user connected");
	socket.broadcast.emit('hi');

	socket.on('chat message', function(msg){
    		console.log('message: ' + msg);
		io.emit('chat message', msg);
  	});
	socket.on('disconnect', function(){
		console.log("User Disconnected");
	})
})

http.listen(4000, function(){
	console.log("Listening on server 4000");
})
