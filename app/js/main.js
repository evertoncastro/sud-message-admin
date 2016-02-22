
var app = angular.module('website', ['ngRoute', 'ui.router', 'ngLoadingSpinner', 'angularModalService']);

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
})


/*
.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);*/


.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                    console.log(JSON.stringify(scope.fileread));
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
}]);