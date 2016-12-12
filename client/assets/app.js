'use strict';

var app = angular.module('app', ['ngRoute']);

app.factory('loginInterceptor',['$q','$location',function($q, $location){
    return{
        'responseError': function(rejection){
            if (rejection.status == 401){
                $location.url('/login');
            }
            return $q.reject(rejection);
        }
    }
}]);

app.config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('loginInterceptor');
    $routeProvider
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
        .when('/game', {
            templateUrl: 'partials/gameBoard.html',
            controller:'gamesController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});