(function($) {

  $('#login-button').click(function() {
    $.ajax({
      url: '/login?' + $.param({email: $('#email').val(), password: $('#password').val()}),
      method: 'post',
      error: function() { alert('error'); },
      success: function(data) {
        var data = JSON.parse(data);
        $('#user-id').val(data.id);
        $('#access-token').val(data.access_token);
      }
    });
  });

  $('#load-conversations-button').click(function() {
    $.ajax({
      url: '/conversations?' + $.param({access_token: $('#access-token').val(), user_id: $('#user-id').val()}),
      error: function() { alert('error'); },
      success: function(data) {
        var models = JSON.parse(data).models;
        models.forEach(function(model) {
          $('#conversations').append('<textarea id="conversation-textarea-' + model.id + '"/>');
          $('#conversations').append('<input id="conversation-input-' + model.id + '"/>')
          $('#conversations').append('<hr/>');
        });
      }
    });
  });

})(jQuery);

/*
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
*/
