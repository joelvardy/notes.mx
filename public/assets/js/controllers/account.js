notesApp.controller('AccountController', ['$state', '$scope', 'Api', 'User', function ($state, $scope, Api, User) {

    User.rest().read({id: Api.getUser().id}, function (data) {
        $scope.user = data.user;
    });

    $scope.update = function () {
        User.rest().update($scope.user, function (data) {
            $scope.success = data.message;
            $scope.error = false;
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

    $scope.remove = function () {
        if ( ! confirm('Are you 100% sure you want to delete your account (all data will be permanently lost!)')) return;
        User.rest().delete({id: Api.getUser().id}, function (data) {
            $state.go('logout');
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

}]);
