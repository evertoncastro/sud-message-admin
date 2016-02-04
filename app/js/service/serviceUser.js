/**
 * Created by everton on 03/02/16.
 */
/*
var app = angular.module('website');

app.service('serviceUser', function($q, $http, serviceConstants){

    return{

        makeLogin: function(data){
            var defer = $q.defer();
            var URL = serviceConstants.URL_LOGIN;

            var json = {email: data.email, password: data.password};

            $http.post(URL, json).then(
                function(result){
                    defer.resolve(result);
                },
                function(error){
                    defer.reject(error);
                }
            );

            return defer.promise;
        }

    }
});*/
