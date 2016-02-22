/**
 * Created by everton on 03/02/16.
 */

app.service('serviceImage', function($q, $http){

    return{

        uploadImage: function(file) {
            var defer = $q.defer();
            var URL = 'https://api.imgur.com/3/image';
            var headers = {'Authorization': 'Client-ID 8208c4b5f89b7c6'};

            $http({headers: headers, url: URL, method: 'POST', data: file}).then(
                function (response) {
                    if(response && response.data.data.link){
                        defer.resolve(response.data.data.link);
                    }else{
                        defer.resolve();
                    }
                },
                function (error) {
                    console.log(error.data.data.error);
                    defer.reject(error);
                }
            );

            return defer.promise;
        },


        /*getAuthorization: function(){
            var defer = $q.defer();
            var URL = 'https://api.imgur.com/oauth2/authorize?client_id=eb9ffeba8218f3a&response_type=token&state=APPLICATION_STATE';

            $http.get(URL).then(
                function(response){
                    console.log(response);
                },
                function(){
                    console.log(error);
                }
            );

            return defer.promise;
        }*/
    }
});
