'use strict';

/* Controllers */


function CreateCtrl ($scope, $location,HouseholdService) {
  init();

  function init() {
    $scope.action = 'Add';
    var house = {};
    $scope.house = house;
    // HouseholdService.save($scope.house, function() {
      //$location.path('/edit/'+$scope.house["_id"])
    // })
  }

  $scope.save = function() {
    alert($scope.house);
    HouseholdService.save($scope.house, function() {
      $location.path('/edit/'+$scope.house["_id"])
    })
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
CreateCtrl.$inject = ['$scope','$location', '$http','HouseholdService'];


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