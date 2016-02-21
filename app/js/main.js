
var app = angular.module('website', ['ngRoute', 'ui.router', 'ngLoadingSpinner']);

app.run(function($rootScope, $location){
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (!current) {
            $location.path('/');
        }
    });
});

app.config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $routeProvider
        .when("/", {templateUrl: "templates/login.html", controller: "LoginCtrl"})
        .when("/home", {templateUrl: "templates/home.html", controller: "HomeCtrl"})
        .when("/messages", {templateUrl: "templates/messages.html", controller: "MessagesCtrl"})
        .when("/people", {templateUrl: "templates/people.html", controller: "PeopleCtrl"})
        .when("/support", {templateUrl: "templates/support.html"})
        .when('/404', {templateUrl: "templates/404.html"})
        .otherwise("/404");
});


