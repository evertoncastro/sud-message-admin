app.controller('CtrlComplex', ['$scope', '$element', 'title', 'close',
    function($scope, $element, title, close) {

        $scope.name = null;
        $scope.age = null;
        $scope.title = title;

        //  This cancel function must use the bootstrap, 'modal' function because
        //  the doesn't have the 'data-dismiss' attribute.
        $scope.cancel = function() {

            //  Manually hide the modal.
            $element.modal('hide');

            //  Now call close, returning control to the caller.
            close({
                name: $scope.name,
                age: $scope.age
            }, 500); // close, but give 500ms for bootstrap to animate
        };

    }]);