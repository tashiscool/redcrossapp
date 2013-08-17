'use strict';

/* Controllers */


function CreateCtrl($scope, $location, $http, HouseholdService, $resource) {
    init();

    var HouseHold = $resource('/api/households/:id', {id: '@id'}, {update: {method: 'PUT'}})

    function init() {
        $scope.user = { username: "", password: "", auth: false};
        $scope.action = 'Add';
        var house = {};
        $scope.house = house;
        // HouseholdService.save($scope.house, function() {
        //$location.path('/edit/'+$scope.house["_id"])
        // })
        if (!$scope.user.auth) {
            $location.path('/login');
        }
    }

    $scope.save = function () {
        // HouseHold.save($scope.house, function() {
        //   $location.path('/edit/'+$scope.house["_id"])
        // })
        $http.post('/api/households', $scope.house).success(function (data) {
            console.log("recieved from api" + data.id + " id " + data["_id"]);
            $scope.house.id = data["_id"]
            $location.path('/edit/' + $scope.house.id);
        });
    }


    $scope.select = function (i) {
        $scope.index = index
        index = i
        $scope.selectedId = $scope.houses[index].id
    }

    $scope.delete = function () {
        if (index >= 0) {
            HouseholdService.delete({id: $scope.houses[index].id})
            $scope.houses.splice(index, 1)
        }
    }

    $scope.loadPage = function (pg) {
        $scope.offset = pg - 1
        $scope.houses = HouseholdService.query({offset: $scope.offset, limit: $scope.limit})
    }
    $scope.addPerson = function(){
        $scope.house.push($scope.selectedpeople);
    }
    $scope.addFood =function(){
        $scope.house.push($scope.selectedpeople);
    }
}
CreateCtrl.$inject = ['$scope', '$location', '$http', 'HouseholdService', '$resource'];


function EditCtrl($scope, $location, $routeParams) {
    var id = $routeParams.id
    // HouseholdService.get({id: id}, function(resp) {
    //   $scope.house = resp.content
    // })
    //$scope.house = HouseholdService.get({id: id})
    $scope.action = "Update"


    $scope.save = function () {
        // HouseholdService.update({id: id}, $scope.house, function() {
        //   $location.path('/')
        // })
    }
}

EditCtrl.$inject = ['$location', '$http', '$scope', '$routeParams', 'userLikeBookUrl', 'userNextUrl', 'userCreateUrl'];

function loginCtrl($scope, $location, $http, HouseholdService, $resource) {

    $scope.signup = function()
    {
        console.log('CREATE USER');
        $location.path('/newUser');
    }

    $scope.login = function () {
        $http.get('/api/users/auth?username=' + $scope.user.username + '&password=' + $scope.user.password, $scope.house).success(function (data) {
            console.log("recieved from api" + data.id + " id " + data["_id"]);
            if (data === undefined) {
                $scope.user.auth = false;
            }
            else {
                $scope.user.auth = true;
                $location.path('/new');
            }
        });
    }
}
loginCtrl.$inject = ['$scope', '$location', '$http', 'HouseholdService', '$resource'];


function HeaderCtrl($scope, $location, $route) {
    $scope.isAuthenticated = function()
    {
        if ($scope.user === undefined)
            return false;
        return $scope.user.auth;
    }
    $scope.isAdmin = function()
    {
        return true;
    }

};

HeaderCtrl.$inject = ['$scope', '$location', '$route'];

function CreateUserCtrl($scope, $location, $http, HouseholdService, $resource) {


    $scope.onSave = function () {
        $http.post('/api/users', $scope.user).success(function (data) {
            console.log("recieved from api" + data._id + " id " + data["_id"]);
            $scope.user = data;
            $scope.user.auth = true;
            $location.path('/new');
        });
    };

    $scope.onError = function () {
    };

    $scope.onRemove = function (user) {
        $location.path('/admin/users');
    };


};

CreateUserCtrl.$inject = ['$scope', '$location', '$http', 'HouseholdService', '$resource'];

function EditUserCtrl($scope, $location, $http, HouseholdService, $resource) {
    $scope.user = user;
    $scope.password = user.password;

    $scope.onSave = function (user) {
        $location.path('/admin/users');
    };

    $scope.onError = function () {
    };

    $scope.onRemove = function (user) {
        $location.path('/admin/users');
    };
};

EditUserCtrl.$inject = ['$scope', '$location', '$http', 'HouseholdService', '$resource'];

function ShowUsersCtrl($scope, $location, $http, HouseholdService, $resource) {
    $scope.user = user;
    $scope.password = user.password;

    $scope.onSave = function (user) {
        $location.path('/admin/users');
    };

    $scope.onError = function () {
    };

    $scope.onRemove = function (user) {
        $location.path('/admin/users');
    };
};

ShowUsersCtrl.$inject = ['$scope', '$location', '$http', 'HouseholdService', '$resource'];

function FindCtrl($scope, $location, $http, HouseholdService, $resource) {
    $scope.user = user;
    $scope.password = user.password;

    $scope.search = function (user) {
        $location.path('/admin/users');
    };

};

FindCtrl.$inject = ['$scope', '$location', '$http', 'HouseholdService', '$resource'];