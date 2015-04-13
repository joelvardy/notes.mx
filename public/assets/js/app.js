var notesApp = angular.module('notesApp', ['ui.router', 'ngStorage', 'ngResource']);

notesApp.factory('Api', function ($localStorage) {
    return {
        setUser: function(user) {
            $localStorage.user = user;
        },
        getUser: function() {
            return $localStorage.user;
        },
        getPath: function() {
            return '/api/v1';
        },
        getHeaders: function () {
            return {
                'User-Id': this.getUser().id,
                'User-Api-Key': this.getUser().apiKey
            };
        }
    };
});

notesApp.factory('Note', function ($resource, Api) {
    return {
        rest: function () {
            return $resource(Api.getPath() + '/notes/:id', { id: '@id' }, {
                create: {
                    method: 'POST',
                    headers: Api.getHeaders()
                },
                readAll: {
                    headers: Api.getHeaders()
                },
                read: {
                    headers: Api.getHeaders()
                },
                update: {
                    method: 'PUT',
                    headers: Api.getHeaders()
                },
                delete: {
                    method: 'DELETE',
                    headers: Api.getHeaders()
                }
            });
        }
    }
});

notesApp.factory('User', function ($resource, Api) {
    return {
        rest: function () {
            return $resource(Api.getPath() + '/users/:id', { id: '@id' }, {
                registered: {
                    url: Api.getPath() + '/users/registered',
                    method: 'POST'
                },
                authenticate: {
                    url: Api.getPath() + '/users/authenticate',
                    method: 'POST'
                },
                create: {
                    method: 'POST'
                },
                read: {
                    headers: Api.getHeaders()
                },
                update: {
                    method: 'PUT',
                    headers: Api.getHeaders()
                },
                delete: {
                    method: 'DELETE',
                    headers: Api.getHeaders()
                }
            });
        }
    }
});

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

    $scope.delete = function () {
        User.rest().delete({ id: Api.getUser().id }, function(data) {
            $state.go('logout');
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

}]);

notesApp.controller('NoteListController', function ($scope, $state, Note) {

    Note.rest().readAll(function (data) {
        $scope.notes = data.notes;
    }, function (error) {
        $scope.error = error.data.error.message;
    });

    $scope.newNote = function () {
        var noteObject = Note.rest();
        var note = new noteObject();
        note.text = '';
        Note.rest().create(note, function(data) {
            $state.go('noteEdit', { noteId: data.note_id });
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

});

notesApp.controller('NoteEditController', function ($scope, $state, $stateParams, Note) {

    Note.rest().read({ id: $stateParams.noteId }, function (data) {
        $scope.note = data.note;
    }, function (error) {
        $scope.error = error.data.error.message;
    });

    $scope.save = function () {
        Note.rest().update($scope.note, function(data) {
            console.log('Saved');
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

    $scope.delete = function () {
        Note.rest().delete({ id: $stateParams.noteId }, function(data) {
            $state.go('noteList');
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

});

notesApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider.state('authenticate', {
        url: '/authenticate',
        templateUrl: '/assets/templates/authenticate.html',
        controller: 'AuthenticationController'
    });

    $stateProvider.state('logout', {
        url: '/logout',
        controller: 'LogoutController'
    });

    $stateProvider.state('account', {
        url: '/account',
        templateUrl: '/assets/templates/account.html',
        controller: 'AccountController'
    });

    $stateProvider.state('noteList', {
        url: '/notes',
        templateUrl: '/assets/templates/note-list.html',
        controller: 'NoteListController'
    });

    $stateProvider.state('noteEdit', {
        url: '/notes/:noteId',
        templateUrl: '/assets/templates/note-edit.html',
        controller: 'NoteEditController'
    });

    $urlRouterProvider.otherwise('/notes');

});

notesApp.run(function ($rootScope, $state, Api) {

    $rootScope.$on('$locationChangeSuccess', function (event) {
        if ( ! Api.getUser()) {
            $state.go('authenticate');
        } else if ($state.current.name === 'authenticate') {
            $state.go('noteList');
        }
    });

});
