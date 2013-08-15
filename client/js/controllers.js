'use strict';

/* Controllers */


function CreateCtrl ($scope, $location,$http, HouseholdService, $resource) {
  init();

  var HouseHold = $resource('/api/households/:id', {id: '@id'}, {update: {method: 'PUT'}})
  function init() {
    $scope.action = 'Add';
    var house = {};
    $scope.house = house;
    // HouseholdService.save($scope.house, function() {
      //$location.path('/edit/'+$scope.house["_id"])
    // })
  }

  $scope.save = function() {
    // HouseHold.save($scope.house, function() {
    //   $location.path('/edit/'+$scope.house["_id"])
    // })
      $http.post('/api/households', $scope.house).success(function (data){
        console.log("recieved from api" + data.id+ " id " + data["_id"]);
        $scope.house.id = data["_id"]
        $location.path('/edit/'+$scope.house.id);
      });
  }  


  $scope.select = function(i) {
    $scope.index = index
    index = i
    $scope.selectedId = $scope.houses[index].id
  }

  $scope.delete = function() {
    if (index >= 0) {
      HouseholdService.delete({id: $scope.houses[index].id})
      $scope.houses.splice(index, 1)
    }
  }

  $scope.loadPage = function (pg) {
    $scope.offset = pg - 1
    $scope.houses = HouseholdService.query({offset: $scope.offset, limit: $scope.limit})
  }

}
CreateCtrl.$inject = ['$scope','$location', '$http','HouseholdService', '$resource'];


function EditCtrl ($scope, $location, $routeParams) {
  var id = $routeParams.id
  // HouseholdService.get({id: id}, function(resp) {
  //   $scope.house = resp.content  
  // })
  //$scope.house = HouseholdService.get({id: id})
  $scope.action = "Update"


  $scope.save = function() {
    // HouseholdService.update({id: id}, $scope.house, function() {
    //   $location.path('/')
    // })
  }
}



EditCtrl.$inject = ['$location', '$http', '$scope', '$routeParams', 'userLikeBookUrl', 'userNextUrl','userCreateUrl'];