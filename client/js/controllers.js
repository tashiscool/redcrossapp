'use strict';

/* Controllers */


function CreateCtrl($scope, $location, $http, HouseholdService, $resource, userService) {
    $scope.save = function () {
        $http.post('/api/households', $scope.house).success(function (data) {
            console.log("recieved from api" + data.id + " id " + data["_id"]);
            $scope.house.id = data["_id"];
            $location.path('/edit/' + $scope.house.id);
        });
    };

    init();

    var HouseHold = $resource('/api/households/:id', {id:'@id'}, {update:{method:'PUT'}});

    function init() {
        if ( $scope.house == null || $scope.house === undefined)
        {
            $scope.house = {};
            $scope.house.people = [];
            $scope.house.foodtaken = [];
        }

        $scope.save();

        $scope.user = userService.user.data;
        console.log("User " + $scope.user);
        if ($scope.user == undefined || !$scope.user.auth) {
            console.log("redirecting to login");
            $location.path('/login');
        }
    }




    $scope.select = function (i) {
        $scope.index = index;
        index = i;
        $scope.selectedId = $scope.houses[index].id
    };

    $scope.delete = function () {
        if (index >= 0) {
            HouseholdService.delete({id:$scope.houses[index].id});
            $scope.houses.splice(index, 1)
        }
    };

    $scope.loadPage = function (pg) {
        $scope.offset = pg - 1;
        $scope.houses = HouseholdService.query({offset:$scope.offset, limit:$scope.limit})
    };
    $scope.addPerson = function () {
        $scope.house.people.push($scope.selectedpeaple);
    };
    $scope.addFood =function(){
        $scope.house.foodtaken.push($scope.selectedfoodtaken);
    }
}
CreateCtrl.$inject = ['$scope', '$location', '$http', 'HouseholdService', '$resource','userService'];


function EditCtrl($scope, $location, $http, HouseholdService, $resource, userService) {
    var id = $routeParams.id;


    $http.get('/api/households/'+$scope.house.id, $scope.house).success(function (data) {
        console.log("Updated received from api" + data.id + " id " + data["_id"]);
        $scope.house.id = HouseholdService.house.data.id = data["_id"];
        $scope.house = HouseholdService.house.data = data;
        $location.path('/edit/' + $scope.house.id);
    });

    $scope.action = "Update";


    $scope.save = function () {
        // HouseHold.save($scope.house, function() {
        //   $location.path('/edit/'+$scope.house["_id"])
        // })
        $http.put('/api/households/'+$scope.house.id, $scope.house).success(function (data) {
            console.log("Updated received from api" + data.id + " id " + data["_id"]);
            $scope.house.id = data["_id"];
            $location.path('/edit/' + $scope.house.id);
        });
    }
}

EditCtrl.$inject = ['$scope', '$location', '$http', 'HouseholdService', '$resource','userService'];

function loginCtrl($scope, $location, $http, HouseholdService, $resource, userService) {

    $scope.signup = function () {
        console.log('CREATE USER');
        $location.path('/newUser');
    };

    $scope.login = function () {
        $http.get('/api/users/auth?username=' + $scope.user.username + '&password=' + $scope.user.password).success(function (data) {
            console.log("recieved from api" + data + " id " + data["_id"]);
            $scope.user = userService.user.data = data;
            if (data === undefined) {
                $scope.user = {};
                $scope.user.auth = false;
            }
            else {
                console.log("user defined " + $scope.user);
                $scope.user.auth = true;
                $location.path('/new');
            }
        });
    }
}
loginCtrl.$inject = ['$scope', '$location', '$http', 'HouseholdService', '$resource', 'userService'];


function HeaderCtrl($scope, $location, $route, userService, $http) {
    $scope.isAuthenticated = function () {
        $scope.user = userService.user.data;
        console.log("Step " + $scope.user);
        if ($scope.user === undefined || $scope.user == null)
            return false;
        return $scope.user.auth;
    };
    $scope.isAdmin = function () {
        return true;
    };
    $scope.search = function()
    {
        var searchterm = $scope.menu.id;
        $scope.results = [];
        $http.get('/api/households/search/'+searchterm).success(function(data){
            $scope.results.push(data);
        });
    }

};

HeaderCtrl.$inject = ['$scope', '$location', '$route','userService', '$http'];

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
    //$scope.user = user;
    //$scope.password = user.password;

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
//    $scope.user = user;
//    $scope.password = user.password;

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