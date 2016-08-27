/**
 * Created by everton on 03/02/16.
 */
app.controller('EventCtrl', function ($rootScope, $scope, $location, serviceEvent,
                                         servicePeople, serviceImage, $timeout) {

    $scope.showEvent = undefined;
    $scope.showTabEvents = true;
    $scope.tabTitle = 'EVENTOS';
    $scope.buttonTitle = 'NOVO EVENTO';

    $scope.listStatus = [{text: 'Sim', value: '1'}, {text: 'Não', value: '0'}];
    $scope.listDisplay = [{text: 'Normal', value: 'default'}, {text: 'Banner', value: 'banner'}];

    $scope.init = function(){

        serviceEvent.loadEvent().then(
            function(result){
                $scope.listEvent = result;
            }
        );

        servicePeople.loadPersonList().then(
            function(data){
                $scope.peopleList = data;
            }
        );

        serviceImage.setUploadImage(false);
    };

    $scope.uploadImage = function(fileread){
        serviceImage.uploadImage(fileread).then(
            function(data){
                if(!$scope.data){
                    $scope.data = {};
                }
                $scope.data.image = data;
            }
        );
    };

    $scope.registerEvent = function(event){
        serviceEvent.prepareEventUpload(event);
    };

    $scope.deleteEvent = function(event){
        serviceEvent.deleteEvent(event);
    };

    $scope.openEvent = function(index){
        serviceEvent.setUploadMode('edit');
        if($scope.showEvent || $scope.showEvent==0){
            $scope.showEvent = undefined;
        }else{
            $scope.showEvent = index;
        }
    };

    $scope.changeTab = function(){
        if($scope.showTabEvents){
            $scope.showTabEvents = false;
            $scope.tabTitle = 'CRIAR EVENTO';
            $scope.buttonTitle = 'VOLTAR';
            serviceEvent.setUploadMode('new');
        }else{
            $scope.showTabEvents = true;
            $scope.tabTitle = 'EVENTOS';
            $scope.buttonTitle = 'NOVO EVENTO';
            serviceEvent.setUploadMode('edit');
        }
    };


    $scope.fileChanged = function(e) {
        var files = e.target.files;
        if($scope.event && $scope.event.image){
            $scope.event.image = undefined;
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
        if($scope.event && $scope.event.image){
            $scope.event.image = undefined;
        }
    };

    $scope.copyImageToScope = function() {
        if(!$scope.event){
            $scope.event = {};
        }
        $scope.event.image = $scope.imgSrc;
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


    String.prototype.splice = function(idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
});