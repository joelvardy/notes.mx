<!DOCTYPE html>
<html>
    <head>
        <base href="/">
        <link rel="stylesheet" href="/assets/minified/app.css" />
        <script src="/assets/minified/app.js"></script>
    </head>
    <body ng-app="notesApp">
        <a ui-sref="authenticate" ng-if=" ! authenticated">Login / Register</a>
        <a ui-sref="noteList" ng-if="authenticated">Notes</a>
        <a ui-sref="account" ng-if="authenticated">Account</a>
        <a ui-sref="logout" ng-if="authenticated">Logout</a>
        <div ui-view></div>
    </body>
</html>
