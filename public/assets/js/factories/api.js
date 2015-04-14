notesApp.factory('Api', ['$localStorage', function ($localStorage) {
    return {
        setUser: function (user) {
            $localStorage.user = user;
        },
        getUser: function () {
            return $localStorage.user;
        },
        getPath: function () {
            return '/api/v1';
        },
        getHeaders: function () {
            if ( ! this.getUser()) return {};
            return {
                'User-Id': this.getUser().id,
                'User-Api-Key': this.getUser().apiKey
            };
        }
    };
}]);
