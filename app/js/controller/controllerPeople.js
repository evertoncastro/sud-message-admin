/**
 * Created by everton on 03/02/16.
 */
app.controller('PeopleCtrl', function ($scope, $location, servicePeople) {


    $scope.showList = true;
    $scope.data = undefined;

    $scope.init = function(){
        servicePeople.loadPeopleList().then(
            function(data){
                $scope.users = data;
            }
        );
    };

    $scope.goToPersonDetail = function(user){
        $scope.data = user;
        $scope.showList = false;
        servicePeople.setUploadMode('edit');
    };

    $scope.goToNewPerson = function(){
        $scope.data = {};
        $scope.showList = false;
        servicePeople.setUploadMode('new');
    };

    $scope.returnToList = function(){
        $scope.data = undefined;
        $scope.showList = true;
    };

    $scope.registerPerson = function(data){
        servicePeople.uploadPerson(data);
    };


    $scope.init();

});
