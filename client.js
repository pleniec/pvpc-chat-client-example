var accessToken = location.search.match(/\?access_token=(.*)/)[1];
var socket = io.connect('http://localhost:8080?accessToken=' + accessToken);

socket.on('connect', function() {
  socket.on('message', function(message) {
    console.log(JSON.stringify(message));
  });

  socket.on('errorMessage', function(message) {
    console.log(JSON.stringify(message));
  });

  socket.emit('message', {conversation: 1, text: 'heheszky'});
});
