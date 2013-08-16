'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngCookies','ngResource']).
	config(['$locationProvider', function($location) {
        $location.html5Mode(true).hashPrefix('!'); //now there won't be a hashbang within URLs for browers that support HTML5 history
    }]).
  	config(['$routeProvider', function($routeProvider) {
    	$routeProvider.when('/edit/:id', {controller: EditCtrl, templateUrl: 'partials/details.html'});
    	$routeProvider.when('/new', {controller: CreateCtrl, templateUrl: 'partials/details.html'}); 
      $routeProvider.when('/login', { templateUrl: 'partials/login.html', controller: loginCtrl });
      $routeProvider.when('/main', { templateUrl: 'partials/main.html', controller: mainCtrl }); 
    	$routeProvider.otherwise({redirectTo: '/new'});
  	}]).
  	factory('HouseholdService', function($resource) {
  		return $resource('/api/households/:id', {id: '@id'}, {update: {method: 'PUT'}})
	})
  ;



      