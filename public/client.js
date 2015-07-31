(function($) {
  angular
    .module('pvpc.chat.client.example', [])
    .controller('pvpc.chat.client.example', function($scope, $http) {
      $scope.login = function() {
        $http
          .post('/login', null, {params: {email: $scope.email, password: $scope.password}})
          .success(function(data) {
            $scope.userId = data.id;
            $scope.accessToken = data.access_token;
            $scope.socket = io.connect('http://localhost:8080?accessToken=' + $scope.accessToken);

            $scope.socket.on('connect', function() {
              $scope.socket.on('message', function(message) {
                $scope.$apply(function() {
                  $scope.conversations[message.conversation].messages.push(message);
                });
              });

              $scope.socket.on('errorMessage', function(message) {
                console.log(JSON.stringify(message));
              });
            })
          })
          .error(function() {
            alert('error');
          });
      };

      $scope.loadConversations = function() {
        $http
          .get('/conversationParticipants', {params: {access_token: $scope.accessToken, user_id: $scope.userId}})
          .success(function(data) {
            var conversationParticipants = data.models;
            $scope.conversations = _.reduce(_.map(conversationParticipants, function(conversationParticipant) {
              var obj = {};
              obj[conversationParticipant.conversation.id] = {model: conversationParticipant.conversation, messages: []};
              return obj;
            }), function(memo, obj) {
              return _.extend(memo, obj);
            }, {});
          })
          .error(function() {
            alert('error');
          });
      };

      $scope.sendMessage = function(conversationId, message) {
        if(message.length > 0) {
          $scope.socket.emit('message', {conversation: conversationId, text: message});
        }
      };
    });

})(jQuery);
