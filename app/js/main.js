
var app = angular.module('website', ['ngRoute', 'ui.router', 'ngLoadingSpinner', 'angularModalService', 'ImageCropper']);

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
        .when("/missionary", {templateUrl: "templates/missionary.html", controller: "MissionaryCtrl"})
        .when("/event", {templateUrl: "templates/event.html", controller: "EventCtrl"})
        .when("/support", {templateUrl: "templates/support.html"})
        .when('/404', {templateUrl: "templates/404.html"})
        .otherwise("/404");
})


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
}])

.directive('masktime', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                var clean = val.replace(/[^0-9\.]+/g, '');

                String.prototype.splice = function(start, delCount, newSubStr) {
                    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
                };

                if(clean.length>3){
                    if(Number(clean)>2359){
                        clean = '0';
                        callSweetAlert('Aviso', 'Siga o padrão 00:00 para horário!')
                    }else{
                        clean = clean.splice(2, 0, ':');
                    }
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }

                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});