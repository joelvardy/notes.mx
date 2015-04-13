notesApp.factory('Note', ['$resource', 'Api', function ($resource, Api) {
    return {
        rest: function () {
            return $resource(Api.getPath() + '/notes/:id', {id: '@id'}, {
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
}]);
