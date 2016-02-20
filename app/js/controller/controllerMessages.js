/**
 * Created by everton on 03/02/16.
 */
app.controller('MessagesCtrl', function ($rootScope, $scope, $location, serviceMessage, servicePeople) {

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
    };

    $scope.registerMessage = function(message){
        serviceMessage.registerMessage(message);
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

    $scope.init();

});