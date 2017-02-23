app.controller('usersController', ['$scope','userFactory', '$routeParams','$location', function($scope, userFactory, $routeParams, $location) {
    /*
     THIS INDEX METHOD ACCESSES THE FRIENDS FACTORY AND RUNS THE FRIENDS INDEX.
     WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
     */

    var show = function(){
        userFactory.show(function(returnedData){
            console.log(returnedData.data);
            $scope.user = returnedData.data;
            console.log($scope.user);
        });
    };

    var showUsers = function(){
        userFactory.showUsers(function(returnedData){
            console.log(returnedData.data);
            $scope.users = returnedData.data;
            console.log("users shown");
        });
    };

    showUsers();

    $scope.updateUser = function(id, post){
        console.log(post);
        userFactory.update(id, post, function(returnData) {
            console.log(returnData);
            if(returnData.hasOwnProperty('errors')){
                $scope.errors = returnData.errors;
            } else {
                show();
            }
        });
    };

    var getRequests = function(){
        userFactory.showRequests(function(returnedData){
            console.log('my requests below');
            console.log(returnedData.data[0]);
            $scope.req = returnedData.data[0];
        });
    };

    var getFriends = function(){
        userFactory.showFriends(function(returnedData){
            console.log('my friends below');
            console.log(returnedData.data[0]);
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
        console.log('my message');
        console.log(message);
        userFactory.addmessage(message, forId, function(data) {
          if(data.hasOwnProperty('errors')){
            $scope.messageErrors = data.errors;
            console.log(data.errors);
          } else {
            getMessages();
            $scope.message.message = '';
          }
        })
      };

}]);