'use strict';

var app = angular.module('app', ['ngRoute']);

app.factory('loginInterceptor',['$q','$location',function($q, $location){
    return{
        'responseError': function(rejection){
            if (rejection.status == 401){
                $location.url('');
            }
            return $q.reject(rejection);
        }
    }
}]);

app.config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('loginInterceptor');
    $routeProvider
        .when('/splash', {
            templateUrl: 'partials/splash.html',
            controller:'splashController'
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller:'sessionsController'
        })
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller:'usersController'
        })
        .when('/profile', {
            templateUrl: 'partials/profile.html',
            controller:'usersController'
        })
        .when('/find', {
            templateUrl: 'partials/findFriends.html',
            controller:'usersController'
        })
        .when('/game/:id', {
            templateUrl: 'partials/gameBoard.html',
            controller:'gamesController'
        })
        .when('/friend/:id', {
            templateUrl: 'partials/FriendProfile.html',
            controller:'friendsController'
        })
        .otherwise({
            redirectTo: '/splash'
        });
});