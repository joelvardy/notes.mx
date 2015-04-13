var notesApp = angular.module('notesApp', ['ui.router', 'ngStorage', 'ngResource']);

notesApp.factory('User', function ($localStorage){
    return {
        set: function(user) {
            $localStorage.user = user;
        },
        get: function() {
            return $localStorage.user;
        }
    }
});

notesApp.factory('Note', function ($rootScope, $resource, User) {
    return {
        rest: function () {
            if ( ! User.get()) throw Error('Not authenticated');
            var headers = {
                'User-Id': User.get().id,
                'User-Api-Key': User.get().apiKey
            };
            return $resource($rootScope.apiPath + '/notes/:id', { id: '@id' }, {
                create: {
                    method: 'POST',
                    headers: headers
                },
                readAll: {
                    headers: headers
                },
                read: {
                    headers: headers
                },
                update: {
                    method: 'PUT',
                    headers: headers
                },
                delete: {
                    method: 'DELETE',
                    headers: headers
                }
            });
        }
    }
});

notesApp.controller('AuthenticationController', ['$scope', '$state', '$http', 'User', function ($scope, $state, $http, User) {

    if (User.get()) {
        $state.go('noteList');
    }

    $scope.submitText = 'Login / Register';

    $scope.checkRegistration = function () {
        $http.post($scope.apiPath + '/users/registered', {
            email: $scope.email
        }).success(function (data) {
            if (data.registered) {
                $scope.submitText = 'Login';
            } else {
                $scope.submitText = 'Register';
            }
        });
    };

    var authenticate = function (email, password) {
        $http.post($scope.apiPath + '/users/authenticate', {
            email: email,
            password: password
        }).success(function (data) {
            User.set({
                id: data.user_id,
                apiKey: data.api_key
            });
            $state.go('noteList');
        }).error(function (data) {
            $scope.error = data.error.message;
        });
    };

    $scope.submit = function () {
        if ($scope.submitText === 'Register') {
            $http.post($scope.apiPath + '/users', {
                email: $scope.email,
                password: $scope.password
            }).success(function (data) {
                authenticate($scope.email, $scope.password);
            }).error(function (data) {
                $scope.error = data.error.message;
            });
        } else {
            authenticate($scope.email, $scope.password);
        }
    };

}]);

notesApp.controller('LogoutController', ['$state', 'User', function ($state, User) {
    User.set(false);
    $state.go('authenticate');
}]);

notesApp.controller('NoteListController', function ($scope, $state, Note) {

    var data = Note.rest().readAll(function () {
        $scope.notes = data.notes;
    });

    $scope.newNote = function () {
        var noteObject = Note.rest();
        var note = new noteObject();
        note.text = '';
        Note.rest().create(note, function(data) {
            $state.go('noteEdit', { noteId: data.note_id });
        });
    };

});

notesApp.controller('NoteEditController', function ($scope, $state, $stateParams, Note) {

    var data = Note.rest().read({ id: $stateParams.noteId }, function () {
        $scope.note = data.note;
    });

    $scope.save = function () {
        Note.rest().update($scope.note, function() {
            console.log('Saved');
        });
    };

    $scope.delete = function () {
        Note.rest().delete({ id: $stateParams.noteId }, function() {
            $state.go('noteList');
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

notesApp.run(function ($rootScope, $state, User) {

    $rootScope.apiPath = '/api/v1';

    $rootScope.$on('$locationChangeSuccess', function (event) {
        if ( ! User.get()) {
            $state.go('authenticate');
        } else if ($state.current.name === 'authenticate') {
            $state.go('noteList');
        }
    });

});
