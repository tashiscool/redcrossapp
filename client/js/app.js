'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngCookies','ngResource']).
	config(['$locationProvider', function($location) {
        $location.html5Mode(true).hashPrefix('!'); //now there won't be a hashbang within URLs for browers that support HTML5 history
    }]).
  	config(['$routeProvider', function($routeProvider) {
    	$routeProvider.when('/partials/edit/:id', {controller: EditCtrl, templateUrl: 'partials/details.html'});
    	$routeProvider.when('/partials/new', {controller: CreateCtrl, templateUrl: 'partials/details.html'});  
    	$routeProvider.otherwise({redirectTo: '/partials/new'});
  	}]).
  	factory('HouseholdService', function($resource) {
  		return $resource('/api/households/:id', {id: '@id'}, {update: {method: 'PUT'}})
	})
  ;



      