notesApp.run(['$rootScope', '$state', 'Api', function ($rootScope, $state, Api) {

    $rootScope.$on('$locationChangeSuccess', function (event) {

        $rootScope.authenticated = !! Api.getUser();

        if ( ! Api.getUser()) {
            $state.go('authenticate');
        } else if ($state.current.name === 'authenticate') {
            $state.go('noteList');
        }

        $window.ga('send', 'pageview', {
            page: $location.url()
        });

    });

}]);
