app.controller('sessionsController', ['$scope','userFactory', '$location', function($scope, userFactory, $location) {


    $scope.login = function(user){
        userFactory.login(user, function (returnData) {
            if (returnData.hasOwnProperty('errors')) {
                $scope.logErrors = returnData.errors;
            } else {
                $scope.currentUser = returnData;
                $location.url('/home'); 
            }
        })
    };

    $scope.register = function(newUser){
        userFactory.register(newUser, function(returnData) {
            if(returnData.hasOwnProperty('errors')){
                $scope.regErrors = returnData.errors;
            } else {
                $scope.currentUser = returnData;
                $location.url('/profile');
            }
        });
    };

}]);