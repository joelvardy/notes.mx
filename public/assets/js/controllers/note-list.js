notesApp.controller('NoteListController', ['$rootScope', '$scope', '$state', 'Note', function ($rootScope, $scope, $state, Note) {

    Note.rest().readAll(function (data) {
        $scope.notes = data.notes;
    }, function (error) {
        $scope.error = error.data.error.message;
    });

    $scope.noteTitle = function (string) {
        if (string === '') return '';
        string = string.match(/[^\r\n]+/g)[0];
        if (string.length > 35) {
            string = string.substr(0, 34);
            string = string.substr(0, string.lastIndexOf(' '));
        }
        return string;
    };

    $rootScope.newNote = function () {
        var noteObject = Note.rest();
        var note = new noteObject();
        note.text = '';
        Note.rest().create(note, function (data) {
            $state.go('noteEdit', {noteId: data.note_id});
        }, function (error) {
            $scope.error = error.data.error.message;
        });
    };

    $scope.$on('$destroy', function () {
        delete $rootScope.newNote;
    });

}]);
