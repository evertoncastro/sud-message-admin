/**
 * Created by everton on 03/02/16.
 */
app.controller('MessagesCtrl', function ($rootScope, $scope, $location, serviceMessage,
                                         servicePeople, serviceImage, $timeout) {

    $scope.showMessage = undefined;
    $scope.showTabMessages = true;
    $scope.tabTitle = 'MENSAGENS';
    $scope.buttonTitle = 'Nova mensagem';

    $scope.message = {};
    $scope.listStatus = [{text: 'Sim', value: '1'}, {text: 'Não', value: '0'}];
    $scope.listDisplay = [{text: 'Normal', value: 'default'}, {text: 'Banner', value: 'banner'}];

    $scope.init = function(){

        serviceMessage.loadMessage().then(
            function(result){
                $scope.listMessage = result;
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

    $scope.registerMessage = function(message){
        serviceMessage.prepareMessageUpload(message);
    };

    $scope.deleteMessage = function(message){
        serviceMessage.deleteMessage(message)
    };

    $scope.openMessage = function(index){
        serviceMessage.setUploadMode('edit');
        if($scope.showMessage || $scope.showMessage==0){
            $scope.showMessage = undefined;
        }else{
            $scope.showMessage = index;
        }
    };

    $scope.changeTab = function(){
        if($scope.showTabMessages){
            $scope.showTabMessages = false;
            $scope.tabTitle = 'CRIAR MENSAGEM';
            $scope.buttonTitle = 'Voltar';
            serviceMessage.setUploadMode('new');
        }else{
            $scope.showTabMessages = true;
            $scope.tabTitle = 'MENSAGENS';
            $scope.buttonTitle = 'Nova mensagem';
            serviceMessage.setUploadMode('edit');
        }
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