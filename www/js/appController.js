//https://docs.angularjs.org/api/
//https://material.angularjs.org/

var app = angular.module('myApp', ['ngAnimate', 'ngMaterial', 'ngMessages', 'ngRoute']);

var serverUrl = "localhost:8080/";

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/account/account.html",
            controller : "accountController"
        }).when("/main", {
            templateUrl: "templates/main/mainApp.html",
            controller : "mainController"
        })
});

app.controller("appController", function ($scope) {
});