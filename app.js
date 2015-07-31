var express = require('express');
var app = express();
var rest = require('restler');

app.use(express.static('public'));

app.post('/login', function(req, res) {
  console.log(req.query);
  rest
    .post('http://localhost:3000/users/login', {username: 'pvpc',
                                                password: 'pefalpe987',
                                                data: req.query})
    .on('complete', function(result) {
      res.send(JSON.stringify(result))
    });
});

app.get('/conversationParticipants', function(req, res) {
  rest
    .get('http://localhost:3000/conversation_participants', {username: 'pvpc',
                                                             password: 'pefalpe987',
                                                             data: req.query})
    .on('complete', function(result) {
      res.send(JSON.stringify(result));
    });
});

app.listen(8000);
