notesApp.controller('NoteEditController', ['$scope', '$state', '$stateParams', 'Note', function ($scope, $state, $stateParams, Note) {

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

    $scope.remove = function () {
        Note.rest().delete({ id: $stateParams.noteId }, function(data) {
            $state.go('noteList');
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

}]);
