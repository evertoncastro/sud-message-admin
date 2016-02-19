/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('serviceUnity', function($q, $http, serviceConstants){

    return{

        loadUnityList: function(){
            var defer = $q.defer();

            var URL = serviceConstants.URL_UNITY_LIST;
            $http.get(URL).then(
                function(result) {
                    if(result && result.data){
                        defer.resolve(result.data);
                    }else{
                        defer.resolve([]);
                    }
                },
                function(error){
                    defer.reject(error);
                    callSweetAlert();
                }
            );

            return defer.promise;
        }
    }
});
