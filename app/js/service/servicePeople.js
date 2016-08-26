/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('servicePeople', function($q, serviceGlobalVariables, $http, serviceConstants,
                                      serviceUtil, serviceUnity, $route, serviceImage){

    var uploadMode = 'new';

    return{

        setUploadMode: function(mode){
            uploadMode = mode;
        },

        getUploadMode: function(){
            return uploadMode;
        },

        preparePersonUpload: function(personInfo){
            var self = this;
            var uploadImage = serviceImage.getUploadImage();
            if(uploadImage && personInfo.image){
                var currentUnity = serviceUnity.getCurrentUnity();
                serviceImage.uploadImage(personInfo.image, currentUnity.number, 'person_').then(
                    function(respUrl){
                        personInfo.image = respUrl;
                        self.uploadPerson(personInfo);
                    }
                );
            }else{
                self.uploadPerson(personInfo);
            }
        },

        uploadPerson: function(personInfo){
            var defer = $q.defer();
            var self = this;
            var userData = serviceGlobalVariables.getUserData();
            var operation = self.getUploadMode();
            var status = this.validateData(personInfo, userData);
            var unityInfo = serviceUnity.getCurrentUnity();
            if(status){
                var json = {};
                var URL = '';
                var successMessage = undefined;
                var failMessage = undefined;
                if(operation=='new'){
                    var thisDate = new Date();
                    thisDate = serviceUtil.parseToString(thisDate, 'dd/mm/aaaa', true);
                    URL = serviceConstants.URL_REGISTER_PERSON;
                    successMessage = serviceConstants.MSG_ALERT_SUCCESS_REGISTER_PERSON;
                    failMessage = serviceConstants.MSG_ALERT_FAILURE_REGISTER_PERSON;
                    json = {firstname: personInfo.firstname, lastname: personInfo.lastname, image: personInfo.image, thisDate: thisDate,
                        exibitionName: personInfo.exibitionName, unityName: personInfo.unityName, calling: personInfo.calling, token: userData.token};
                }else if(operation=='edit'){
                    URL = serviceConstants.URL_UPDATE_PERSON;
                    successMessage = serviceConstants.MSG_ALERT_SUCCESS_UPDATE_PERSON;
                    failMessage = serviceConstants.MSG_ALERT_FAILURE_UPDATE_PERSON;
                    json = {firstname: personInfo.firstname, lastname: personInfo.lastname,
                        exibitionName: personInfo.exibitionName, unityName: personInfo.unityName, calling: personInfo.calling,
                        personUrlSafe: personInfo.personUrlSafe, token: userData.token};

                    var uploadImage = serviceImage.getUploadImage();
                    if(uploadImage){
                        json.image = personInfo.image;
                    }
                }
                $http.post(URL, json).then(
                    function(result){
                        defer.resolve(result);
                        if(result && result.data.intern){
                            callSweetAlert(successMessage.title, successMessage.text,
                                function(){
                                    $route.reload();
                                }
                            );
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
            var unityInfo = serviceUnity.getCurrentUnity();
            var URL = serviceConstants.URL_LOAD_PERSON_LIST+unityInfo.number;
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
