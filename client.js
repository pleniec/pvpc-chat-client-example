var accessToken = 'p56ZB21-UeVsGJru4L_N';
var socket = io.connect('http://localhost:8080?accessToken=' + accessToken);

socket.emit('message', {conversation: 1});

socket.on('message', function(message) {
  console.log(JSON.stringify(message));
});
