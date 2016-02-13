/**
 * Created by everton on 03/02/16.
 */
app.controller('MessagesCtrl', function ($scope, $location, serviceMessage) {

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

    $scope.init();

});