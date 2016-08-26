/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('serviceUnity', function($q, $http, $rootScope, serviceConstants){

    var currentUnity = undefined;
    var unityList = undefined;
    return{

        getCurrentUnity: function(){
            return currentUnity;
        },

        setCurrentUnity: function(unity){
            currentUnity = unity;
            $rootScope.unityNamePage = unity.name;
        },

        getCurrentUnityList: function(){
            return unityList;
        },

        setCurrentUnityList: function(list){
            unityList = list;
        },

        getUnityList: function(){
            return serviceConstants.LIST_UNITY;
        },

        loadFullUnityList: function(){
            var defer = $q.defer();
            var self = this;

            if(unityList){
                defer.resolve(unityList);
            }else{
              var URL = serviceConstants.URL_FULL_UNITY_LIST;
              $http.get(URL).then(
                  function(result) {
                      if(result && result.data){
                          self.setCurrentUnityList(result.data);
                          defer.resolve(result.data);
                      }else{
                          defer.resolve(false);
                      }
                  },
                  function(error){
                      defer.reject(error);
                  }
              );
            }
            return defer.promise;
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
