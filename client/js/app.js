'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngCookies'])
    .config(['$locationProvider', function($location) {
        $location.html5Mode(true).hashPrefix('!'); //now there won't be a hashbang within URLs for browers that support HTML5 history
    }]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/edit/:id', {controller: EditCtrl, templateUrl: '/partials/details.html'});
    $routeProvider.when('/new', {controller: CreateCtrl, templateUrl: '/partials/details.html'});    
    $routeProvider.otherwise({redirectTo: '/edit/1'});
  }])
  ;