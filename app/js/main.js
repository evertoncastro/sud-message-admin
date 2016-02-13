
var app = angular.module('website', ['ngRoute', 'ui.router']);

app.config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $routeProvider
        .when("/", {templateUrl: "templates/login.html", controller: "LoginCtrl"})
        .when("/home", {templateUrl: "templates/home.html", controller: "HomeCtrl"})
        .when("/sobre", {templateUrl: "templates/sobre.html", controller: "SobreCtrl"})
        .when("/messages", {templateUrl: "templates/messages.html", controller: "MessagesCtrl"})
        .when("/precos", {templateUrl: "templates/precos.html", controller: "PrecosCtrl"})
        .when('/404', {templateUrl: "templates/404.html"})
        .otherwise("/404");
});



app.controller('SobreCtrl', function ($scope, $location) {

});

app.controller('ServicosCtrl', function ($scope, $location) {

});

app.controller('PrecosCtrl', function ($scope, $location) {

});

