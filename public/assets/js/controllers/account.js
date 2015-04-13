notesApp.controller('AccountController', ['$state', '$scope', 'Api', 'User', function ($state, $scope, Api, User) {

    User.rest().read({ id: Api.getUser().id }, function (data) {
        $scope.user = data.user;
    });

    $scope.update = function () {
        User.rest().update($scope.user, function(data) {
            console.log('Updated user');
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

    $scope.remove = function () {
        User.rest().delete({ id: Api.getUser().id }, function(data) {
            $state.go('logout');
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

}]);
