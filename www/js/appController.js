//https://docs.angularjs.org/api/
//https://material.angularjs.org/

var app = angular.module('myApp', ['ngAnimate', 'ngMaterial', 'ngMessages', 'ngRoute']);

var serverUrl = "localhost:8080/";
var loggedIn = false;
var username = "";

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/account/account.html",
            controller: "accountController"
        }).when("/lobbies", {
            templateUrl: "templates/main/lobbies.html",
            controller: "lobbiesController"
        })
});

app.controller("appController", function ($scope, $mdSidenav) {
    $scope.toggleLeft = function () {
        if (loggedIn)
            $mdSidenav('left').toggle();
    }

    $scope.openLeft = function () {
        if (loggedIn)
            $mdSidenav('left').open();
    }

    $scope.closeLeft = function () {
        if (loggedIn)
            $mdSidenav('left').close();
    }
});

app.controller('sidenavController', function ($scope, $mdSidenav) {
    $scope.close = function () {
        $mdSidenav('left').close();
    };
})