/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('serviceMessage', function($q, serviceGlobalVariables, $http, serviceConstants){

    var uploadMode = 'edit';

    return{

        setUploadMode: function(mode){
            uploadMode = mode;
        },

        getUploadMode: function(){
            return uploadMode;
        },

        registerMessage: function(message){
            var defer = $q.defer();
            var self = this;
            var userData = serviceGlobalVariables.getUserData();
            var operation = self.getUploadMode();
            var status = this.validateData(message, userData);
            if(status){
                var json = {title: message.title, text: message.text, image: message.image, urlsafe: message.urlsafe,
                    status: message.status, personUrlSafe: message.personUrlSafe, token: userData.token};
                var URL = '';
                var successMessage = undefined;
                var failMessage = undefined;
                if(operation=='new'){
                    URL = serviceConstants.URL_REGISTER_MESSAGE;
                    successMessage = serviceConstants.MSG_ALERT_SUCCESS_REGISTER_MESSAGE;
                    failMessage = serviceConstants.MSG_ALERT_FAILURE_REGISTER_MESSAGE;
                }else if(operation=='edit'){
                    URL = serviceConstants.URL_UPDATE_MESSAGE;
                    successMessage = serviceConstants.MSG_ALERT_SUCCESS_UPDATE_MESSAGE;
                    failMessage = serviceConstants.MSG_ALERT_FAILURE_UPDATE_MESSAGE;
                }
                $http.post(URL, json).then(
                    function(result){
                        defer.resolve(result);
                        callSweetAlert(successMessage);
                    },
                    function(error){
                        defer.reject(error);
                        callSweetAlert(failMessage);
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
