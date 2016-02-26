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

            var date = new Date();
            //date =  date.toString().replace(/ /g,'');

            var cloud_name = serviceConstants.CLOUD_IMAGE_NAME;
            var fd = new FormData();

            fd.append('upload_preset', serviceConstants.CLOUD_UPLOAD_PRESET);
            fd.append('folder', album+unity);
            fd.append('file', file);
            fd.append('public_id', date);

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
                    console.log(JSON.stringify(reponse));
                });

            return defer.promise;
        }
    }
});
