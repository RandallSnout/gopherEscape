app.controller('usersController', ['$scope','userFactory', '$routeParams','$location', function($scope, userFactory, $routeParams, $location) {
    /*
     THIS INDEX METHOD ACCESSES THE FRIENDS FACTORY AND RUNS THE FRIENDS INDEX.
     WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
     */

    var show = function(){
        userFactory.show(function(returnedData){
            $scope.user = returnedData.data;
        });
    };

    var showUsers = function(){
        userFactory.showUsers(function(returnedData){
            $scope.users = returnedData.data;
        });
    };

    showUsers();

    $scope.updateUser = function(id, post){
        userFactory.update(id, post, function(returnData) {
            if(returnData.hasOwnProperty('errors')){
                $scope.errors = returnData.errors;
            } else {
                show();
            }
        });
    };

    var getRequests = function(){
        userFactory.showRequests(function(returnedData){
            $scope.req = returnedData.data[0];
        });
    };

    var getFriends = function(){
        userFactory.showFriends(function(returnedData){
            $scope.friends = returnedData.data[0];
        });
    };

    getFriends();
    getRequests();

    $scope.friend = function(friendID){
        userFactory.sendRequest(friendID, function(data) {
            if(data.hasOwnProperty('errors')){
                $scope.errors = data.errors;
            } else {
                showUsers();
            }
        });
    };

    $scope.addFriend = function(friendID){
        userFactory.confirmRequest(friendID, function(data) {
            if(data.hasOwnProperty('errors')){
                $scope.errors = data.errors;
            } else {
                $route.reload();
            }
        });
        getFriends();
        getRequests();
    };

    $scope.denyFriend = function(friendID){
        userFactory.denyRequest(friendID, function(data) {
            if(data.hasOwnProperty('errors')){
                $scope.errors = data.errors;
            } else {
                $route.reload();
            }
        });
        getFriends();
        getRequests();
    };

    $scope.removeFriend = function(friendID){
        userFactory.deleteFriend(friendID, function(data) {
            if(data.hasOwnProperty('errors')){
                $scope.errors = data.errors;
            } else {
                $route.reload();
            }
        });
        getFriends();
    };

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

    var getMessages = function(){
        userFactory.getMessages(function(data){
          $scope.messages = data;
        })
      }
    getMessages();

    $scope.addmessage = function(message, forId){
        userFactory.addmessage(message, forId, function(data) {
          if(data.hasOwnProperty('errors')){
            $scope.messageErrors = data.errors;
          } else {
            getMessages();
            $scope.message.message = '';
          }
        })
      };

}]);