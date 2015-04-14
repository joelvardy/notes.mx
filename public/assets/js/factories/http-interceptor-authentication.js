notesApp.factory('HttpInterceptorAuthentication', ['$q', '$injector', function ($q, $injector) {
    return {

        responseError: function (response) {

            if (response.status === 401) {
                $injector.get('$state').transitionTo('logout');
            }

            return response || $q.when(response);

        }

    };
}]);
