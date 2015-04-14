notesApp.factory('HttpInterceptorNoteEncryption', ['$q', 'Api', function ($q, Api) {
    return {

        request: function (config) {

            var encryptNote = function (config) {
                config.data.text = sjcl.encrypt(Api.getUser().passphrase, config.data.text);
                return config;
            };

            if (config.method === 'POST' && config.url === Api.getPath() + '/notes') {
                config = encryptNote(config);
            }

            if (config.method === 'PUT' && config.url.match('^' + Api.getPath() + '/notes/([0-9]+)$')) {
                config = encryptNote(config);
            }

            return config;

        },

        response: function (response) {

            var decryptNote = function (note) {
                try {
                    note.text = sjcl.decrypt(Api.getUser().passphrase, note.text);
                } catch (e) {
                    return false;
                }
                return note;
            };

            if (response.config.method === 'GET' && response.config.url === Api.getPath() + '/notes') {
                var notes = [];
                angular.forEach(response.data.notes, function (note, key) {
                    var decryptedNote = decryptNote(note);
                    if (decryptedNote) {
                        this.push(decryptedNote);
                    }
                }, notes);
                response.data.notes = notes;
            }

            if (response.config.method === 'GET' && response.config.url.match('^' + Api.getPath() + '/notes/([0-9]+)$')) {
                response.data.note = decryptNote(response.data.note);
            }

            return response || $q.when(response);

        }

    };
}]);
