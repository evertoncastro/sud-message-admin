/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('serviceMessage', function($q, serviceGlobalVariables, $http, serviceConstants,
                                       serviceUtil, serviceUnity, $location, $route, serviceImage){

    var uploadMode = 'edit';

    return{

        setUploadMode: function(mode){
            uploadMode = mode;
            console.log(mode);
        },

        getUploadMode: function(){
            return uploadMode;
        },

        prepareMessageUpload: function(message){
            var self = this;
            var uploadImage = serviceImage.getUploadImage();
            if(uploadImage && message.image){
                var currentUnity = serviceUnity.getCurrentUnity();
                serviceImage.uploadImage(message.image, currentUnity.number, 'message_').then(
                    function(respUrl){
                        message.image = respUrl;
                        self.registerMessage(message);
                    }
                );
            }else{
                self.registerMessage(message);
            }
        },

        registerMessage: function(message){
            var defer = $q.defer();
            var self = this;
            var userData = serviceGlobalVariables.getUserData();
            var operation = self.getUploadMode();
            var status = this.validateData(message);
            var unityInfo = serviceUnity.getCurrentUnity();

            var thisDate = new Date();
            thisDate = serviceUtil.parseToString(thisDate, 'dd/mm/aaaa', true);

            if(status){
                var json = {title: message.title, text: message.text, image: message.image, urlsafe: message.urlsafe, unityNumber: unityInfo.number,
                    status: message.status, display: message.display, personUrlSafe: message.personUrlSafe, token: userData.token, thisDate: thisDate};
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
                        if(result && result.data.intern){
                            callSweetAlert(successMessage.title, successMessage.text,
                                function(){
                                    $route.reload();
                                }
                            );
                        }else{
                            callSweetAlert(failMessage.title, failMessage.text);
                        }
                        defer.resolve(result);
                    },
                    function(error){
                        defer.reject(error);
                        callSweetAlert(failMessage.title, failMessage.text);
                    }
                );
            }
            return defer.promise;
        },


        loadMessage: function(){
            var defer = $q.defer();
            var unityInfo = serviceUnity.getCurrentUnity();
            var URL = serviceConstants.URL_LOAD_MESSAGE+unityInfo.number;
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

        validateData: function(message){
            var status = true;

            if(!message || serviceUtil.isEmpty(message.title)){
                status = false;
                callSweetAlert(serviceConstants.MSG_EMPTY_MESSAGE_TITLE.title, serviceConstants.MSG_EMPTY_MESSAGE_TITLE.text);
            }
            else if(!message || serviceUtil.isEmpty(message.text)){
                status = false;
                callSweetAlert(serviceConstants.MSG_EMPTY_MESSAGE_TEXT.title, serviceConstants.MSG_EMPTY_MESSAGE_TEXT.text);
            }
            else if(!message || serviceUtil.isEmpty(message.personUrlSafe)){
                status = false;
                callSweetAlert(serviceConstants.MSG_EMPTY_MESSAGE_PEOPLE.title, serviceConstants.MSG_EMPTY_MESSAGE_PEOPLE.text);
            }
            else if(!message || serviceUtil.isEmpty(message.status)){
                status = false;
                callSweetAlert(serviceConstants.MSG_EMPTY_MESSAGE_STATUS.title, serviceConstants.MSG_EMPTY_MESSAGE_STATUS.text);
            }
            else if(!message || serviceUtil.isEmpty(message.display)){
                status = false;
                callSweetAlert(serviceConstants.MSG_EMPTY_MESSAGE_DISPLAY.title, serviceConstants.MSG_EMPTY_MESSAGE_DISPLAY.text);
            }

            return status;
        }


    }
});
