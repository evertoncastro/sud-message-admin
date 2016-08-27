/**
 * Created by everton on 03/02/16.
 */
app.controller('PeopleCtrl', function ($timeout, $scope, $location, servicePeople, serviceUnity, serviceImage) {


    $scope.showList = true;
    $scope.data = {};
    $scope.listUnity = [];
    $scope.entityTitle = undefined;

    $scope.init = function(){
        /*serviceUnity.loadFullUnityList().then(
            function(data){
                $scope.listUnity = data;
            }
        );*/
        $scope.listUnity = serviceUnity.getUnityList();

        servicePeople.loadPersonList().then(
            function(data){
                $scope.users = data;
            }
        );

        serviceImage.setUploadImage(false);
    };


    $scope.goToPersonDetail = function(user){
        $scope.data = user;
        $scope.showList = false;
        servicePeople.setUploadMode('edit');
    };

    $scope.goToNewPerson = function(){
        $scope.data = {};
        $scope.showList = false;
        servicePeople.setUploadMode('new');
    };

    $scope.returnToList = function(){
        $scope.data = undefined;
        $scope.showList = true;
    };

    $scope.registerPerson = function(data){
        servicePeople.preparePersonUpload(data);
    };

    $scope.deletePerson = function(person){
        servicePeople.deletePerson(person);
    };

    $scope.fileChanged = function(e) {
        var files = e.target.files;
        if($scope.data && $scope.data.image){
            $scope.data.image = undefined;
        }
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = function(e) {
            $scope.imgSrc = this.result;
            $scope.$apply();
        };

    };

    $scope.clearImageCrop = function() {
        $scope.imageCropStep = 1;
        delete $scope.imgSrc;
        delete $scope.resultBlob;
        if($scope.data && $scope.data.image){
            $scope.data.image = undefined;
        }
    };

    $scope.copyImageToScope = function() {
        if(!$scope.data){
            $scope.data = {};
        }
        $scope.data.image = $scope.imgSrc;
        $scope.imageCropStep = 1;
    };

    $scope.cropImage = function(){
        $scope.initCrop = true;
        $scope.imageCropStep = 1;
        $timeout(function() {
            delete $scope.imgSrc;
            delete $scope.resultBlob;
        }, 3000);
        serviceImage.setUploadImage(true);
    };


    $scope.init();

});
