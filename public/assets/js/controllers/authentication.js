notesApp.controller('AuthenticationController', ['$scope', '$state', 'Api', 'User', function ($scope, $state, Api, User) {

    if (Api.getUser()) {
        $state.go('noteList');
    }

    $scope.submitText = 'Login / Register';

    $scope.checkRegistration = function () {
        User.rest().registered({
            email: $scope.email
        }, function (data) {
            if (data.error) {
                return $scope.error = data.error.message;
            }
            if (data.registered) {
                $scope.submitText = 'Login';
            } else {
                $scope.submitText = 'Register';
            }
        });
    };

    var authenticate = function (email, password) {
        User.rest().authenticate({
            email: email,
            password: password
        }, function (data) {
            if (data.error) {
                return $scope.error = data.error.message;
            }
            Api.setUser({
                id: data.user_id,
                apiKey: data.api_key,
                passphrase: $scope.passphrase
            });
            $state.go('noteList');
        });
    };

    $scope.submit = function () {
        if ($scope.submitText === 'Register') {
            var userObject = User.rest();
            var user = new userObject();
            user.email = $scope.email;
            user.password = $scope.password;
            User.rest().create(user, function (data) {
                if (data.error) {
                    return $scope.error = data.error.message;
                }
                authenticate($scope.email, $scope.password);
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
