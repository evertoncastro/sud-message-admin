
var app = angular.module('website', ['ngRoute', 'ui.router']);

app.config(function ($routeProvider, $httpProvider, $stateProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    /*$stateProvider
        .state("app", {url: "/app", templateUrl: "templates/login.html", controller: "LoginCtrl"})
        .state("app.home", {url: "/home", templateUrl: "templates/home.html", controller: "HomeCtrl"})
        .otherwise("/404");*/

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
        alert(serviceConstants.URL_LOGIN);
    };

    $scope.init();
});

app.controller('SobreCtrl', function ($scope, $location) {

});

app.controller('ServicosCtrl', function ($scope, $location) {

});

app.controller('PrecosCtrl', function ($scope, $location) {

});

