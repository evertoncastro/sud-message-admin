/**
 * Created by everton on 03/02/16.
 */

var app = angular.module('website');

app.service('serviceMissionary', function($q, serviceGlobalVariables, $http, serviceConstants,
                                      serviceUtil, serviceUnity, $route, serviceImage){

    var uploadMode = 'new';

    return{

        setUploadMode: function(mode){
            uploadMode = mode;
        },

        getUploadMode: function(){
            return uploadMode;
        },

        prepareMissionaryUpload: function(missionaryInfo){
            var self = this;
            var userData = serviceGlobalVariables.getUserData();
            var status = this.validateData(missionaryInfo, userData);
            if(status){
                var base64 = 'data:image/png;base64,';
                var uploadImage = serviceImage.getUploadImage();
                missionaryInfo.newimage = '';
                if(uploadImage && missionaryInfo.image){
                    missionaryInfo.newimage = '1';
                    var currentUnity = serviceUnity.getCurrentUnity();
                    serviceImage.uploadImage(missionaryInfo.image, 1, 'sudmural').then(
                        function(respUrl){
                            missionaryInfo.image = respUrl;
                            self.uploadMissionary(missionaryInfo);
                        }
                    );
                }else{
                    self.uploadMissionary(missionaryInfo);
                }
            }

        },

        uploadMissionary: function(missionaryInfo){
            var defer = $q.defer();
            var self = this;
            var userData = serviceGlobalVariables.getUserData();
            var operation = self.getUploadMode();
            var unityInfo = serviceUnity.getCurrentUnity();
            var json = {};
            var URL = '';
            var successMessage = undefined;
            var failMessage = undefined;
            if(operation=='new'){
                URL = serviceConstants.URL_REGISTER_MISSIONARY;
                successMessage = serviceConstants.MSG_ALERT_SUCCESS_REGISTER_MISSIONARY;
                failMessage = serviceConstants.MSG_ALERT_FAILURE_REGISTER_MISSIONARY;
                json = {firstname: missionaryInfo.firstname, lastname: missionaryInfo.lastname,
                  image: missionaryInfo.image, exibitionName: missionaryInfo.exibitionName,
                  unityName: missionaryInfo.unityName, mission: missionaryInfo.mission,
                  email: missionaryInfo.email, address: missionaryInfo.address,
                  period_serving: missionaryInfo.period_serving, token: userData.token};
            }else if(operation=='edit'){
                URL = serviceConstants.URL_UPDATE_MISSIONARY;
                successMessage = serviceConstants.MSG_ALERT_SUCCESS_UPDATE_MISSIONARY;
                failMessage = serviceConstants.MSG_ALERT_FAILURE_UPDATE_MISSIONARY;
                json = {id: missionaryInfo.id, firstname: missionaryInfo.firstname, lastname: missionaryInfo.lastname,
                  exibitionName: missionaryInfo.exibitionName,
                  unityName: missionaryInfo.unityName, mission: missionaryInfo.mission,
                  email: missionaryInfo.email, address: missionaryInfo.address,
                  period_serving: missionaryInfo.period_serving, token: userData.token};
                var uploadImage = serviceImage.getUploadImage();
                if(uploadImage){
                    json.image = missionaryInfo.image;
                }
                serviceImage.setUploadImage(false);
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

            return defer.promise;
        },

        deleteMissionary: function(missionary){
            var defer = $q.defer();
            var userData = serviceGlobalVariables.getUserData();
            var URL = serviceConstants.URL_DELETE_MISSIONARY;
            var json = {token: userData.token, id: missionary.id};
            $http.post(URL, json).then(
                function(result){
                    if(result && result.data){
                        defer.resolve(result.data);
                        callSweetAlert(serviceConstants.MSG_DELETE_MISSIONARY_SUCESS.title,
                            serviceConstants.MSG_DELETE_MISSIONARY_SUCESS.text,
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


        loadMissionaryList: function(){
            var defer = $q.defer();
            var unityInfo = serviceUnity.getCurrentUnity();
            var URL = serviceConstants.URL_LOAD_MISSIONARY_LIST;
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


        validateData: function(missionary, userData){
            var validation = true;
            var self = this;
            var operation = self.getUploadMode();
            if(!missionary || !missionary.firstname){
                validation = false;
            }else if(!missionary || !missionary.firstname){
                validation = false;
            }else if(!missionary || !missionary.lastname){
                validation = false;
            }else if(operation=='new' && (!missionary || !missionary.image)){
                validation = false;
            }else if(!missionary || !missionary.exibitionName){
                validation = false;
            }else if(!missionary || !missionary.unityName){
                validation = false;
            }else if(!missionary || !missionary.mission){
                validation = false;
            }else if(!missionary || !missionary.email){
                validation = false;
            }else if(!missionary || !missionary.address){
                validation = false;
            }else if(!missionary || !missionary.period_serving){
                validation = false;
            }else if(!missionary || !missionary.firstname){
                validation = false;
            }else if(!userData || !userData.token){
                validation = false;
            }

            if(!validation){
                callSweetAlert(serviceConstants.INCOMPLETE_MISSIONARY_DATA.title, serviceConstants.INCOMPLETE_MISSIONARY_DATA.text)
            }

            return validation
        }


    }
});
