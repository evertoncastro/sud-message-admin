/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('serviceEvent', function($q, serviceGlobalVariables, $http, serviceConstants,
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

        prepareEventUpload: function(event){
            var self = this;
            var uploadImage = serviceImage.getUploadImage();
            if(uploadImage && event.image){
                var currentUnity = serviceUnity.getCurrentUnity();
                serviceImage.uploadImage(event.image, currentUnity.number, 'event_').then(
                    function(respUrl){
                        event.image = respUrl;
                        self.registerEvent(event);
                    }
                );
            }else{
                self.registerEvent(event);
            }
        },

        registerEvent: function(event){
            var defer = $q.defer();
            var self = this;
            var userData = serviceGlobalVariables.getUserData();
            var operation = self.getUploadMode();
            var status = this.validateData(event);
            var unityInfo = serviceUnity.getCurrentUnity();

            if(status){
                if(event.date.constructor===Date){
                    event.date = serviceUtil.parseToString(event.date, 'dd/mm/aaaa', true);
                }else{
                    event.date = '';
                }
                var json = {title: event.title, place: event.place, image: event.image, description: event.description,
                    date: event.date, time: event.time, display: event.display,
                    token: userData.token, eventUrlSafe: event.eventUrlSafe};
                var URL = '';
                var successEvent = undefined;
                var failEvent = undefined;
                if(operation=='new'){
                    URL = serviceConstants.URL_REGISTER_EVENT;
                    successEvent = serviceConstants.MSG_ALERT_SUCCESS_REGISTER_EVENT;
                    failEvent = serviceConstants.MSG_ALERT_FAILURE_REGISTER_EVENT;
                }else if(operation=='edit'){
                    URL = serviceConstants.URL_UPDATE_EVENT;
                    successEvent = serviceConstants.MSG_ALERT_SUCCESS_UPDATE_EVENT;
                    failEvent = serviceConstants.MSG_ALERT_FAILURE_UPDATE_EVENT;
                }
                $http.post(URL, json).then(
                    function(result){
                        if(result && result.data.intern){
                            callSweetAlert(successEvent.title, successEvent.text,
                                function(){
                                    $route.reload();
                                }
                            );
                        }else{
                            callSweetAlert(failEvent.title, failEvent.text);
                        }
                        defer.resolve(result);
                    },
                    function(error){
                        defer.reject(error);
                        callSweetAlert(failEvent.title, failEvent.text);
                    }
                );
            }
            return defer.promise;
        },


        loadEvent: function(){
            var defer = $q.defer();
            var unityInfo = serviceUnity.getCurrentUnity();
            var URL = serviceConstants.URL_LOAD_EVENT+unityInfo.number;
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

        validateData: function(event){
            var status = true;

            if(!event || serviceUtil.isEmpty(event.title)){
                status = false;
                callSweetAlert(serviceConstants.MSG_EMPTY_EVENT_TITLE.title, serviceConstants.MSG_EMPTY_EVENT_TITLE.text);
            }
            else if(!event || serviceUtil.isEmpty(event.place)){
                status = false;
                callSweetAlert(serviceConstants.MSG_EMPTY_EVENT_PLACE.title, serviceConstants.MSG_EMPTY_EVENT_PLACE.text);
            }
            else if((!event || serviceUtil.isEmpty(event.date)) && serviceUtil.isEmpty(event.dateShow)){
                status = false;
                callSweetAlert(serviceConstants.MSG_EMPTY_EVENT_DATE.title, serviceConstants.MSG_EMPTY_EVENT_DATE.text);
            }
            else if(!event || serviceUtil.isEmpty(event.time) || (event.time.length<5)){
                status = false;
                callSweetAlert(serviceConstants.MSG_EMPTY_EVENT_TIME.title, serviceConstants.MSG_EMPTY_EVENT_TIME.text);
            }
            else if(!event || serviceUtil.isEmpty(event.display)){
                status = false;
                callSweetAlert(serviceConstants.MSG_EMPTY_EVENT_DISPLAY.title, serviceConstants.MSG_EMPTY_EVENT_DISPLAY.text);
            }

            return status;
        }


    }
});
