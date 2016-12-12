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

    show();

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

    $scope.getRequests = function(){
        userFactory.showRequests(function(returnedData){
            console.log(returnedData.data);
            $scope.requests = returnedData.data;
            console.log("friends shown");
        });
    };

    $scope.friend = function(friendID){
        userFactory.sendRequest(friendID, function(data) {
            if(data.hasOwnProperty('errors')){
                $scope.errors = data.errors;
            } else {
                showUsers();
            }
        });
    };

    $scope.logOut = function(){
        userFactory.logout();
        $location.url('/');
    }


}]);