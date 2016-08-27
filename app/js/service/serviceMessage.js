/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('serviceMessage', function($q, serviceGlobalVariables, $http, serviceConstants,
                                       serviceUtil, serviceUnity, $location, $route, serviceImage){

    var uploadMode = 'edit';
    var _message = undefined;
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
            var status = this.validateData(message);
            if(status){
                if(uploadImage && message.image){
                    var currentUnity = serviceUnity.getCurrentUnity();
                    serviceImage.uploadImage(message.image).then(
                        function(respUrl){
                            message.image = respUrl;
                            self.registerMessage(message);
                        }
                    );
                }else{
                    self.registerMessage(message);
                }
            }

        },

        registerMessage: function(message){
            var defer = $q.defer();
            var self = this;
            var userData = serviceGlobalVariables.getUserData();
            var operation = self.getUploadMode();

            var thisDate = new Date();
            thisDate = serviceUtil.parseToString(thisDate, 'dd/mm/aaaa', true);

            var json = {};
            var URL = '';
            var successMessage = undefined;
            var failMessage = undefined;
            if(operation=='new'){
                json = {title: message.title, text: message.text, image: message.image, urlsafe: message.urlsafe,
                    status: message.status, display: message.display, person_id: message.person_id, newimage: message.newimage,
                    token: userData.token, thisDate: thisDate};
                URL = serviceConstants.URL_REGISTER_MESSAGE;
                successMessage = serviceConstants.MSG_ALERT_SUCCESS_REGISTER_MESSAGE;
                failMessage = serviceConstants.MSG_ALERT_FAILURE_REGISTER_MESSAGE;
            }else if(operation=='edit'){
                json = {id: message.id, title: message.title, text: message.text, image: message.image,
                    status: message.status, display: message.display, person_id: message.person_id, token: userData.token,
                    thisDate: thisDate};
                URL = serviceConstants.URL_UPDATE_MESSAGE;
                successMessage = serviceConstants.MSG_ALERT_SUCCESS_UPDATE_MESSAGE;
                failMessage = serviceConstants.MSG_ALERT_FAILURE_UPDATE_MESSAGE;
                var uploadImage = serviceImage.getUploadImage();
                if(uploadImage){
                    json.image = message.image;
                }
                serviceImage.setUploadImage(false);
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

        deleteMessage: function(message){
            var defer = $q.defer();
            var userData = serviceGlobalVariables.getUserData();
            var URL = serviceConstants.URL_DELETE_MESSAGE;
            var json = {token: userData.token, id: message.id};
            $http.post(URL, json).then(
                function(result){
                    if(result && result.data){
                        defer.resolve(result.data);
                        callSweetAlert(serviceConstants.MSG_DELETE_SUCESS.title,
                            serviceConstants.MSG_DELETE_SUCESS.text,
                            function(){
                                $route.reload();
                            }
                        );
                    }
                }, function(error){
                    console.log(error);
                    callSweetAlert(serviceConstants.MSG_DEFAULT_ERROR.title,
                        serviceConstants.MSG_DEFAULT_ERROR.text);
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
            else if(!message || serviceUtil.isEmpty(message.person_id)){
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
