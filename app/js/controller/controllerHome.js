/**
 * Created by everton on 03/02/16.
 */
app.controller('HomeCtrl', function ($scope, $location, serviceConstants, serviceUser, serviceGlobalVariables) {

    $scope.init = function(){
        var user = serviceGlobalVariables.getUserData();
        if(user){
            $location.path('/home');
        }else{
            $location.path('/');
        }
    };

    $scope.init();

});