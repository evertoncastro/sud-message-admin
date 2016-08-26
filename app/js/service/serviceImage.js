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



        /*uploadImage: function(file, unity, album) {
            var defer = $q.defer();
            var self = this;

            var date = new Date();
            //date =  date.toString().replace(/ /g,'');

            var cloud_name = serviceConstants.CLOUD_IMAGE_NAME;
            var fd = new FormData();

            fd.append('upload_preset', serviceConstants.CLOUD_UPLOAD_PRESET);
            fd.append('folder', album+unity);
            fd.append('file', file);
            fd.append('public_id', date);

            json = {
                image : 'http://res.cloudinary.com/di2ic3sli/image/upload/v1462416841/message_1/Wed%20May%2004%202016%2023:54:00%20GMT-0300%20(BRT).png',
                title : "test1",
                type: "url",
                description: "hello",
                album: "KHz1y"
            };

            $http.post('https://api.imgur.com/3/upload', json, {
                headers: {
                    'Authorization': "Bearer 6a015cea11"
                }
            })
                .success(function (cloudinaryResponse) {
                    self.setUploadImage(false);
                    defer.resolve(cloudinaryResponse.url);
                })
                .error(function (reponse) {
                    defer.reject(reponse);
                    console.log(JSON.stringify(reponse));
                });

            return defer.promise;
        }*/

        uploadImage: function(file) {
            var defer = $q.defer();
            var self = this;

            var date = new Date();


            var cloud_name = serviceConstants.CLOUD_IMAGE_NAME;
            var fd = new FormData();

            fd.append('upload_preset', 'bfpxfykl');
            fd.append('folder', 'temp');
            fd.append('file', file);
            fd.append('public_id', date);

            $http.post('https://api.cloudinary.com/v1_1/di2ic3sli/image/upload', fd, {
                    headers: {
                        'Content-Type': undefined,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                .success(function (cloudinaryResponse) {
                    defer.resolve(cloudinaryResponse.url);
                })
                .error(function (reponse) {
                    defer.reject(reponse);
                    console.log(JSON.stringify(reponse));
                });

            return defer.promise;
        }
    }
});
