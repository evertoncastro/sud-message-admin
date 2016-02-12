
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
        .when("/servicos", {templateUrl: "templates/servicos.html", controller: "ServicosCtrl"})
        .when("/precos", {templateUrl: "templates/precos.html", controller: "PrecosCtrl"})
        .when('/404', {templateUrl: "templates/404.html"})
        .otherwise("/404");
});


app.controller('HomeCtrl', function ($scope, $location, serviceConstants) {
    $scope.init = function(){

    };

    $scope.init();
});

app.controller('SobreCtrl', function ($scope, $location) {

});

app.controller('ServicosCtrl', function ($scope, $location) {

});

app.controller('PrecosCtrl', function ($scope, $location) {

});

