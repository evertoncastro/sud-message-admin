/**
 * Created by everton on 03/02/16.
 */
app.controller('HeaderCtrl', function ($scope, $rootScope, serviceUser) {

    $rootScope.showMenu = false;

    $scope.logout = function(){
        serviceUser.makeLogout();
    }


});