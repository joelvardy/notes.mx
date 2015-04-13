notesApp.controller('AuthenticationController', ['$scope', '$state', 'Api', 'User', function ($scope, $state, Api, User) {

    if (Api.getUser()) {
        $state.go('noteList');
    }

    $scope.submitText = 'Login / Register';

    $scope.checkRegistration = function () {
        User.rest().registered({
            email: $scope.email
        }, function(data) {
            if (data.registered) {
                $scope.submitText = 'Login';
            } else {
                $scope.submitText = 'Register';
            }
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

    var authenticate = function (email, password) {
        User.rest().authenticate({
            email: email,
            password: password
        }, function(data) {
            Api.setUser({
                id: data.user_id,
                apiKey: data.api_key
            });
            $state.go('noteList');
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

    $scope.submit = function () {
        if ($scope.submitText === 'Register') {
            var userObject = User.rest();
            var user = new userObject ();
            user.email = $scope.email;
            user.password = $scope.password;
            User.rest().create(user, function(data) {
                authenticate($scope.email, $scope.password);
            }, function (error) {
                $scope.error = error.data.error.message;
            });
        } else {
            authenticate($scope.email, $scope.password);
        }
    };

}]);

notesApp.controller('LogoutController', ['$state', 'Api', function ($state, Api) {
    Api.setUser(false);
    $state.go('authenticate');
}]);
