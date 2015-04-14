notesApp.controller('NoteListController', ['$scope', '$state', 'Note', function ($scope, $state, Note) {

    Note.rest().readAll(function (data) {
        $scope.notes = data.notes;
    }, function (error) {
        $scope.error = error.data.error.message;
    });

    $scope.noteTitle = function (note) {
        string = note.match(/[^\r\n]+/g)[0];
        if (string.length > 35) {
            string = string.substr(0, 34);
            string = string.substr(0, string.lastIndexOf(' '));
        }
        return string;
    };

    $scope.newNote = function () {
        var noteObject = Note.rest();
        var note = new noteObject();
        note.text = '';
        Note.rest().create(note, function (data) {
            $state.go('noteEdit', {noteId: data.note_id});
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

}]);
