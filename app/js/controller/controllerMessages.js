/**
 * Created by everton on 03/02/16.
 */
app.controller('MessagesCtrl', function ($scope, $location, serviceMessage, servicePeople) {

    $scope.showMessage = undefined;
    $scope.showTabMessages = true;
    $scope.tabTitle = 'MINHAS MENSAGENS';
    $scope.buttonTitle = 'Criar mensagem';

    $scope.listStatus = [{text: 'Inativa', value: '0'}, {text: 'Ativa', value: '1'}];

    $scope.init = function(){
        serviceMessage.loadMessage().then(
            function(result){
                $scope.listMessage = result;
            }
        );

        servicePeople.loadPeopleList().then(
            function(data){
                $scope.peopleList = data;
            }
        );
    };

    $scope.registerMessage = function(message){
        serviceMessage.registerMessage(message);
    };

    $scope.openMessage = function(index){
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
        }else{
            $scope.showTabMessages = true;
            $scope.tabTitle = 'MINHAS MENSAGENS';
            $scope.buttonTitle = 'Criar mensagem';
        }
    };

    $scope.init();

});