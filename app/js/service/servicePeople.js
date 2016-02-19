/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('servicePeople', function($q, serviceGlobalVariables, $http, serviceConstants){

    var uploadMode = 'new';

    return{

        setUploadMode: function(mode){
            uploadMode = mode;
        },

        getUploadMode: function(){
            return uploadMode;
        },

        uploadPerson: function(personInfo){
            var defer = $q.defer();
            var self = this;
            var userData = serviceGlobalVariables.getUserData();
            var operation = self.getUploadMode();
            var status = this.validateData(personInfo, userData);
            if(status){
                var json = {};
                var URL = '';
                var successMessage = undefined;
                var failMessage = undefined;
                if(operation=='new'){
                    URL = serviceConstants.URL_REGISTER_PERSON;
                    successMessage = serviceConstants.MSG_ALERT_SUCCESS_REGISTER_PERSON;
                    failMessage = serviceConstants.MSG_ALERT_FAILURE_REGISTER_PERSON;
                    json = {firstname: personInfo.firstname, lastname: personInfo.lastname, image: personInfo.image,
                        exibitionName: personInfo.exibitionName, unityName: personInfo.unityName, token: userData.token};
                }else if(operation=='edit'){
                    URL = serviceConstants.URL_UPDATE_PERSON;
                    successMessage = serviceConstants.MSG_ALERT_SUCCESS_UPDATE_PERSON;
                    failMessage = serviceConstants.MSG_ALERT_FAILURE_UPDATE_PERSON;
                    json = {firstname: personInfo.firstname, lastname: personInfo.lastname, image: personInfo.image,
                        exibitionName: personInfo.exibitionName, unityName: personInfo.unityName, personUrlSafe: personInfo.personUrlSafe,
                        token: userData.token};
                }
                $http.post(URL, json).then(
                    function(result){
                        defer.resolve(result);
                        if(result && result.data.intern){
                            callSweetAlert(successMessage.title, successMessage.text);
                        }else{
                            callSweetAlert(failMessage.title, failMessage.text);
                        }
                    },
                    function(error){
                        defer.reject(error);
                        callSweetAlert(failMessage.title, failMessage.text);
                    }
                );
            }
            return defer.promise;
        },


        loadPersonList: function(){
            var defer = $q.defer();

            var URL = serviceConstants.URL_LOAD_PERSON_LIST;
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
        },


        validateData: function(message, userData){
            return true;
        }


    }
});
