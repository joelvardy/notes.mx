notesApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('HttpInterceptorAuthentication');
    $httpProvider.interceptors.push('HttpInterceptorNoteEncryption');

    $stateProvider.state('authenticate', {
        url: '/authenticate',
        templateUrl: '/assets/templates/authenticate.html',
        controller: 'AuthenticationController'
    });

    $stateProvider.state('logout', {
        url: '/logout',
        controller: 'LogoutController'
    });

    $stateProvider.state('account', {
        url: '/account',
        templateUrl: '/assets/templates/account.html',
        controller: 'AccountController'
    });

    $stateProvider.state('noteList', {
        url: '/notes',
        templateUrl: '/assets/templates/note-list.html',
        controller: 'NoteListController'
    });

    $stateProvider.state('noteEdit', {
        url: '/notes/:noteId',
        templateUrl: '/assets/templates/note-edit.html',
        controller: 'NoteEditController'
    });

    $urlRouterProvider.otherwise('/notes');

}]);
