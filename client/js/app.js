'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngCookies', 'ngResource']).
    config(['$locationProvider', function ($location) {
        $location.html5Mode(true).hashPrefix('!'); //now there won't be a hashbang within URLs for browers that support HTML5 history
    }]).
    config(['$routeProvider', function ($routeProvider) { //These routes should be resource oriented as well, they are not currently
        $routeProvider.when('/edit/:id', {controller: EditCtrl, templateUrl: 'partials/details.html'});
        $routeProvider.when('/new', {controller: CreateCtrl, templateUrl: 'partials/details.html'});
        $routeProvider.when('/find', {controller: FindCtrl, templateUrl: 'partials/find.html'});
        $routeProvider.when('/login', { templateUrl: 'partials/login.html', controller: loginCtrl });
        $routeProvider.when('/newUser', { templateUrl: 'partials/user.html', controller: CreateUserCtrl });
        $routeProvider.when('/editUser', { templateUrl: 'partials/user.html', controller: EditUserCtrl });
        $routeProvider.when('/listUsers', { templateUrl: 'partials/user-list.tpl.html', controller: ShowUsersCtrl });
        $routeProvider.otherwise({redirectTo: '/new'});
    }]).
    factory('HouseholdService', function ($resource) {
        return $resource('/api/households/:id', {id: '@id'}, {update: {method: 'PUT'}})
    }).factory("userService", function(){

        return {user: {data: null } }
    });
;



      