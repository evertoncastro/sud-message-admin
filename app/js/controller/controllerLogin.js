/**
 * Created by everton on 03/02/16.
 */
app.controller('LoginCtrl', function ($scope, $location, serviceConstants, serviceUser) {

    $scope.makeLogin = function(data){
        serviceUser.makeLogin(data).then(
            function(result){
                console.log(result);
            },
            function(error){
                console.log(error);
            }
        );

    };

});