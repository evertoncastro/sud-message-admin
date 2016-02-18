/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('serviceMessage', function($q, serviceGlobalVariables, $http, serviceConstants){

    return{

        registerMessage: function(message){
            var defer = $q.defer();
            var userData = serviceGlobalVariables.getUserData();

            var status = this.validateData(message, userData);
            if(status){
                var json = {title: message.title, text: message.text, image: message.image,
                    status: message.status, personUrlSafe: message.personUrlSafe, token: userData.token};
                var URL = serviceConstants.URL_REGISTER_MESSAGE;
                $http.post(URL, json).then(
                    function(result){
                        defer.resolve(result);
                        callSweetAlert(serviceConstants.MSG_ALERT_SUCCESS_REGISTER_MESSAGE);
                    },
                    function(error){
                        defer.reject(error);
                        callSweetAlert(serviceConstants.MSG_ALERT_FAILURE_REGISTER_MESSAGE);
                    }
                );
            }
            return defer.promise;
        },


        loadMessage: function(){
            var defer = $q.defer();
            var URL = serviceConstants.URL_LOAD_MESSAGE;
            $http.get(URL).then(
                function(result){
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
        },

        validateData: function(message, userData){
            return true;
        }


    }
});
