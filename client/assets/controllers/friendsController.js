app.controller('friendsController', ['$scope','userFactory', '$routeParams','$location', function($scope, userFactory, $routeParams, $location) {
    /*
     THIS INDEX METHOD ACCESSES THE FRIENDS FACTORY AND RUNS THE FRIENDS INDEX.
     WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
     */

    var show = function(){
        userFactory.show(function(returnedData){
            $scope.user = returnedData.data;
        });
    };

    var getFriend = function(friendId){
        userFactory.retrieveFriend(friendId, function(returnedData){
            $scope.friend = returnedData.data;
        })
    };

    getFriend($routeParams.id);

    var levels = function(){
        userFactory.lvlLength(function(returnedData){
            $scope.length = returnedData.data;
        });
    };

    levels();

    $scope.logOut = function(){
        userFactory.logout();
        $location.url('/');
    };

    show();

    var getFriendMessages = function(messId){
        userFactory.friendMessages(messId, function(data){
          $scope.messages = data.data;
        })
      }
    getFriendMessages($routeParams.id);

    $scope.addmessage = function(message, forId){
        userFactory.addmessage(message, forId, function(data) {
          if(data.hasOwnProperty('errors')){
            $scope.messageErrors = data.errors;
          } else {
            getFriendMessages($routeParams.id);
            $scope.message.message = '';
          }
        })
      };

}]);