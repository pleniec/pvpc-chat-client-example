var accessToken = 'cz5WPumy1PkiDg4Xyxzc';
var socket = io.connect('http://localhost:8080?accessToken=' + accessToken);

socket.on('connect', function() {
  socket.on('message', function(message) {
    console.log(JSON.stringify(message));
  });

  setInterval(function() {
    socket.emit('message', {conversation: 1, text: 'heheszky'});
  }, 500);
});
