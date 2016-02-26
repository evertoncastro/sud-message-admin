/**
 * Created by everton on 03/02/16.
 */
app.controller('MessagesCtrl', function ($rootScope, $scope, $location, serviceMessage,
                                         servicePeople, serviceImage, $timeout) {

    $scope.showMessage = undefined;
    $scope.showTabMessages = true;
    $scope.tabTitle = 'MENSAGENS';
    $scope.buttonTitle = 'Nova mensagem';

    $scope.listStatus = [{text: 'Sim', value: '1'}, {text: 'Não', value: '0'}];

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
        if($scope.message && $scope.message.image){
            $scope.message.image = undefined;
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
        if($scope.message && $scope.message.image){
            $scope.message.image = undefined;
        }
    };

    $scope.copyImageToScope = function() {
        if(!$scope.message){
            $scope.message = {};
        }
        $scope.message.image = $scope.imgSrc;
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