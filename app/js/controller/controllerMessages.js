/**
 * Created by everton on 03/02/16.
 */
app.controller('MessagesCtrl', function ($scope, $location, serviceMessage) {

    $scope.showMessage = undefined;

    $scope.registerMessage = function(message){
        serviceMessage.registerMessage(message);
    };

    $scope.init = function(){
        serviceMessage.loadMessageByUser().then(
            function(result){
                $scope.listMessage = result;
            }
        );
    };

    $scope.openMessage = function(index){
        if($scope.showMessage || $scope.showMessage==0){
            $scope.showMessage = undefined;
        }else{
            $scope.showMessage = index;
        }
    };

    $scope.init();

});