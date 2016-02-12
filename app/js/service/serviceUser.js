/**
 * Created by everton on 03/02/16.
 */

app.service('serviceUser', function($q, $http, serviceConstants, $window, $location){

    return{

        makeLogin: function(data){
            var defer = $q.defer();
            var URL = serviceConstants.URL_LOGIN;

            var json = {email: data.email, password: data.password};
            $http.post(URL, json).then(
                function(result){
                    if(result && result.data.status=='OK'){
                        //$window.location.href = '/sud-message-admin/app/index.html#/home';
                        $location.path('/home');
                    }
                    defer.resolve(result);

                },
                function(error){
                    defer.reject(error);
                }
            );

            return defer.promise;
        }

    }
});
