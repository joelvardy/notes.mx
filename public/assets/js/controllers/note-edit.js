notesApp.controller('NoteEditController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'Note', function ($rootScope, $scope, $state, $stateParams, $timeout, Note) {

    Note.rest().read({id: $stateParams.noteId}, function (data) {
        $rootScope.note = data.note;
        $scope.interval = setInterval($rootScope.saveNote, 30000); // Auto save every 30 seconds
    }, function (error) {
        $scope.error = error.data.error.message;
    });

    $rootScope.saveNoteText = 'Save';
    $rootScope.saveNote = function () {
        Note.rest().update(angular.copy($scope.note), function (data) {
            $rootScope.saveNoteText = 'Saved!';
            $timeout(function () {
                $rootScope.saveNoteText = 'Save';
            }, 1000);
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

    $rootScope.removeNote = function () {
        if ( ! confirm('Are you sure you want to delete this note?')) return;
        Note.rest().delete({id: $stateParams.noteId}, function (data) {
            $state.go('noteList');
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

    $scope.$on('$destroy', function () {
        clearInterval($scope.interval);
        delete $rootScope.note;
        delete $rootScope.saveNote;
        delete $rootScope.removeNote;
    });

}]);
