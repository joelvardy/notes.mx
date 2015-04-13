<!DOCTYPE html>
<html>
    <head>
        <base href="/">
        <script src="/assets/js/vendor/angular.min.js"></script>
        <script src="/assets/js/vendor/angular-resource.min.js"></script>
        <script src="/assets/js/vendor/angular.storage.min.js"></script>
        <script src="/assets/js/vendor/angular-ui-router.min.js"></script>
        <script src="/assets/js/app.js"></script>
    </head>
    <body ng-app="notesApp">
        <a ui-sref="authenticate">Login / Register</a>
        <a ui-sref="account">Account</a>
        <a ui-sref="logout">Logout</a>
        <a ui-sref="noteList">Notes</a>
        <div ui-view></div>
    </body>
</html>
