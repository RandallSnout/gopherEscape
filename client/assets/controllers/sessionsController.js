app.controller('sessionsController', ['$scope','userFactory', '$location', function($scope, userFactory, $location) {


    $scope.login = function(user){
        console.log(user);
            userFactory.login(user, function (returnData) {
                if (returnData.hasOwnProperty('errors')) {
                    console.log('failed login');
                    $scope.logErrors = returnData.errors;
                } else {
                    $scope.currentUser = returnData;
                    console.log('successful login');
                    $location.url('/home'); 
                }
            })
    };

    $scope.register = function(newUser){
        console.log(newUser);
        userFactory.register(newUser, function(returnData) {
            console.log(returnData);
            if(returnData.hasOwnProperty('errors')){
                $scope.regErrors = returnData.errors;
            } else {
                $scope.currentUser = returnData;
                console.log(returnData._id + 'returned');
                $location.url('/profile');
            }
        });
    };

}]);