/**
 * Created by everton on 03/02/16.
 */
app.controller('MessagesCtrl', function ($scope, $location, serviceMessage) {

    $scope.showMessage = undefined;
    $scope.showTabMessages = true;
    $scope.tabTitle = 'MINHAS MENSAGENS';
    $scope.buttonTitle = 'Criar mensagem';

    $scope.init = function(){
        serviceMessage.loadMessageByUser().then(
            function(result){
                $scope.listMessage = result;
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