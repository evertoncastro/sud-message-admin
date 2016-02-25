/**
 * Created by everton on 03/02/16.
 */

app.service('serviceImage', function($q, $http, serviceConstants){

    var uploadImage = false;

    return{

        getUploadImage: function(){
            return uploadImage;
        },

        setUploadImage: function(value){
            uploadImage = value;
        },

        uploadImage: function(file, unity, album) {
            var defer = $q.defer();
            var self = this;

            var cloud_name = serviceConstants.CLOUD_IMAGE_NAME;
            var fd = new FormData();

            fd.append('upload_preset', serviceConstants.CLOUD_UPLOAD_PRESET);
            fd.append('folder', album+unity);
            fd.append('file', file);

            $http.post('https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload', fd, {
                    headers: {
                        'Content-Type': undefined,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                .success(function (cloudinaryResponse) {
                    self.setUploadImage(false);
                    defer.resolve(cloudinaryResponse.url);
                })
                .error(function (reponse) {
                    defer.reject(reponse);
                });

            return defer.promise;
        }

        /*uploadImage: function(file) {
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
        },*/


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
