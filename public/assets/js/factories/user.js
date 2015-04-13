notesApp.factory('User', ['$resource', 'Api', function ($resource, Api) {
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
}]);
