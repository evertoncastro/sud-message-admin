
var app = angular.module('website', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {templateUrl: "templates/login.html", controller: "LoginCtrl"})
        .when("/home", {templateUrl: "templates/home.html", controller: "HomeCtrl"})
        .when("/sobre", {templateUrl: "templates/sobre.html", controller: "SobreCtrl"})
        .when("/servicos", {templateUrl: "templates/servicos.html", controller: "ServicosCtrl"})
        .when("/precos", {templateUrl: "templates/precos.html", controller: "PrecosCtrl"})
        .when('/404', {templateUrl: "templates/404.html"})
        .otherwise("/404");
}]);


app.controller('HomeCtrl', function ($scope, $location) {
    $scope.init = function(){
        $scope.a = 'Teste workou'
    };

    $scope.init();
});

app.controller('SobreCtrl', function ($scope, $location) {

});

app.controller('ServicosCtrl', function ($scope, $location) {

});

app.controller('PrecosCtrl', function ($scope, $location) {

});

