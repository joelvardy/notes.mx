notesApp.controller('NoteListController', ['$scope', '$state', 'Note', function ($scope, $state, Note) {

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

}]);
