/**
 * Created by everton on 03/02/16.
 */

app.service('serviceUser', function($q, $http, serviceConstants, $location, serviceGlobalVariables, $rootScope, serviceUnity){

    return{

        makeLogin: function(data){
            var defer = $q.defer();
            var URL = serviceConstants.URL_LOGIN;

            var json = {email: data.email, password: data.password};
            $http.post(URL, json).then(
                function(result){
                    if(result && result.data.status=='OK'){
                        var user = result.data.user_data;
                        user.token = result.data.token;

                        serviceUnity.loadUnityList(user.unityNumber).then(
                            function(data){
                                if(data){
                                    serviceGlobalVariables.setUserData(user);
                                    $rootScope.showMenu = true;
                                    defer.resolve(user);
                                    $location.path('/home');
                                }else{
                                    callSweetAlert(serviceConstants.MSG_DEFAULT_ERROR.text, serviceConstants.MSG_DEFAULT_ERROR.title);
                                    defer.resolve();
                                }
                            },
                            function(error){
                                callSweetAlert(serviceConstants.MSG_DEFAULT_ERROR.text, serviceConstants.MSG_DEFAULT_ERROR.title);
                                defer.reject(error);
                            }
                        );
                    }else{
                        callSweetAlert(serviceConstants.MSG_ALERT_FAIL_LOGIN.text, serviceConstants.MSG_ALERT_FAIL_LOGIN.title);
                        defer.resolve();
                    }
                },
                function(error){
                    defer.reject(error);
                }
            );
            return defer.promise;
        },

        makeLogout: function(){
            serviceGlobalVariables.setUserData(undefined);
            $rootScope.showMenu = false;
            $location.path('/');
        }
    }
});
