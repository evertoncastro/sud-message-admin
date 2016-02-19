/**
 * Created by everton on 03/02/16.
 */
app.controller('PeopleCtrl', function ($timeout, $scope, $location, servicePeople, serviceUnity) {


    $scope.showList = true;
    $scope.data = {};
    $scope.listUnity = [];
    $scope.entityTitle = undefined;

    $scope.init = function(){
        serviceUnity.loadUnityList().then(
            function(data){
                $scope.listUnity = data;
            }
        );
    };

    $scope.fetchPeopleList = function(unity){
        if(unity){
            servicePeople.loadPersonByUnity(unity.unityUrlSafe).then(
                function(data){
                    $scope.users = data;
                    $scope.entityTitle = unity.name;
                }
            );
        }else{
            $scope.entityTitle = undefined;
        }
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
