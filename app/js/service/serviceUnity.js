/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('serviceUnity', function($q, $http, serviceConstants){

    var currentUnity = undefined;

    return{

        getCurrentUnity: function(){
            return currentUnity;
        },

        setCurrentUnity: function(unity){
            currentUnity = unity;
        },

        loadUnityList: function(unityNumber){
            var defer = $q.defer();
            var self = this;

            var URL = serviceConstants.URL_UNITY_LIST+unityNumber;
            $http.get(URL).then(
                function(result) {
                    if(result && result.data.name){
                        self.setCurrentUnity(result.data);
                        defer.resolve(true);
                    }else{
                        defer.resolve(false);
                    }
                },
                function(error){
                    defer.reject(error);
                }
            );

            return defer.promise;
        }
    }
});
