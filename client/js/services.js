'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//This is basically registering globals/singletons
angular.module('myApp.services', []).
  value('version', '0.1').
  value('instagram_search_url', '/api/validate').
  value('userLikeBookUrl', 'http://enigmatic-mountain-8364.herokuapp.com/user/{userid}/dislike/{isbn}.jsonp').
  value('userNextUrl', 'http://enigmatic-mountain-8364.herokuapp.com/user/{userid}/next.jsonp').
  value('userDisLikeBookUrl', 'http://enigmatic-mountain-8364.herokuapp.com/user/{userid}/dislike/{isbn}.jsonp').
  value('userCreateUrl', 'http://enigmatic-mountain-8364.herokuapp.com/user/upsert/{ticket}.jsonp').
  factory('InstagramToken', ['$cookies', function($cookies) {
    var token;
    return function(tkn){
        if(tkn){
            token = $cookies.token = tkn;
        }else{
            if(!token && $cookies.token){
                token = $cookies.token;
            }
        }
        return token;
    }
  }]);