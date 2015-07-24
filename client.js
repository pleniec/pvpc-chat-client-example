var accessToken = '55Qgh6AQwP5mK-x7ycUt';
var socket = io.connect('http://localhost:8080?accessToken=' + accessToken);

socket.emit('message', {conversation: 1});
