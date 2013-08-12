'use strict';

/* Controllers */


function HomeController($location, $scope, $http, InstagramToken, instagram_search_url,userLikeBookUrl, userDisLikeBookUrl,
                        userNextUrl) {

    $scope.userLike = function (bookisbn){
        var config = {
            params: {
                isbn : isbnStr,
                userid: $scope.token,
                callback: 'JSON_CALLBACK'
            }
        };
        console.log($http.jsonp(userLikeBookUrl,config));
    };

    $scope.userNext = function (){

        var successCallback = function(resp, status, headers, config){
            console.log(resp);
            $scope.book = resp.data;
        };
        var config2 = {
            params: {
                userid: $scope.token,
                callback: 'JSON_CALLBACK'
            }
        };
        $http.jsonp(userNextUrl,config2).success(successCallback); //Get book with isbn and pass that
        $location.hash('').path('/Samples');
    };

    $scope.userDisLike = function (bookisbn){
        var config = {
            params: {
                isbn : isbnStr,
                userid: $scope.token,
                callback: 'JSON_CALLBACK'
            }
        };
        console.log($http.jsonp(userDisLikeBookUrl,config));
        $scope.userNext();
    };

  

    $scope.userNext();

}
HomeController.$inject = ['$location', '$scope', '$http', 'InstagramToken', 'instagram_search_url','userLikeBookUrl',
    'userDisLikeBookUrl', 'userNextUrl'];

function InstagramAuthController($location, $http, $scope, InstagramToken, userLikeBookUrl, userNextUrl, userCreateUrl){
    var hash = $location.search('ticket');

    //get samlValidate link/redeem token for piId

    var piId = hash;
    var storeUserId = function(resp, status, headers, config){
        piId = resp.data.id;
        $scope.token = InstagramToken(piId);
    }
    var config3 = {
            params: {
                ticket: hash,
                callback: 'JSON_CALLBACK'
            }
        };
    $http.jsonp(userCreateUrl,config3).success(storeUserId);

    var successCallback = function(resp, status, headers, config){
        console.log(resp);
        $scope.book = resp.data;
    };

    $scope.firstBook = function(isbnStr){
        var config = {
            params: {
                isbn : isbnStr,
                userid: piId,
                callback: 'JSON_CALLBACK'
            }
        };
        var config2 = {
            params: {
                userid: piId,
                callback: 'JSON_CALLBACK'
            }
        };

        //this is where we'd "create" the user in our cassandra
        //since our service is supporting upsert it would really just be that

        console.log($http.jsonp(userLikeBookUrl,config)); //Get book with isbn and pass that
        $http.jsonp(userNextUrl,config2).success(successCallback); //Get book with isbn and pass that
        $location.hash('').path('/Samples');
    };
}
InstagramAuthController.$inject = ['$location', '$http', '$scope', 'InstagramToken', 'userLikeBookUrl', 'userNextUrl','userCreateUrl'];