/**
 * Created by everton on 03/02/16.
 */
app.controller('PeopleCtrl', function ($scope, $location, $http) {


    $scope.showList = true;

    $scope.init = function(){
        $http.get('http://sudmural.appspot.com/loadPersonList').then(
            function(data) {
                $scope.users = data.data;
            },
            function(error){
                console.log(error);
            }
        );
    };


    $scope.init();

});
