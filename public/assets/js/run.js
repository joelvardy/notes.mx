notesApp.run(['$rootScope', '$state', 'Api', function ($rootScope, $state, Api) {

    $rootScope.$on('$locationChangeSuccess', function (event) {
        if ( ! Api.getUser()) {
            $state.go('authenticate');
        } else if ($state.current.name === 'authenticate') {
            $state.go('noteList');
        }
    });

}]);
