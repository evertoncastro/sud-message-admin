/**
 * Created by everton on 03/02/16.
 */

app.service('serviceUser', function($q, $http, serviceConstants, $location, serviceGlobalVariables, $rootScope){

    return{

        makeLogin: function(data){
            var defer = $q.defer();
            var URL = serviceConstants.URL_LOGIN;

            var json = {email: data.email, password: data.password};
            $http.post(URL, json).then(
                function(result){
                    if(result && result.data.status=='OK'){
                        var user = result.data.user_data;
                        serviceGlobalVariables.setUserData(user);
                        $rootScope.showMenu = true;
                        $location.path('/home');
                    }else{
                        callSweetAlert(serviceConstants.MSG_ALERT_FAIL_LOGIN);
                    }
                    defer.resolve(result);

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
