notesApp.controller('NoteEditController', ['$rootScope', '$scope', '$state', '$stateParams', 'Note', function ($rootScope, $scope, $state, $stateParams, Note) {

    Note.rest().read({id: $stateParams.noteId}, function (data) {
        $rootScope.note = data.note;
    }, function (error) {
        $scope.error = error.data.error.message;
    });

    $rootScope.saveNote = function () {
        Note.rest().update(angular.copy($scope.note), function (data) {
            console.log('Saved');
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

    $rootScope.removeNote = function () {
        Note.rest().delete({id: $stateParams.noteId}, function (data) {
            $state.go('noteList');
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

    $scope.$on('$destroy', function () {
        delete $rootScope.note;
        delete $rootScope.saveNote;
        delete $rootScope.removeNote;
    });

}]);
