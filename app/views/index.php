<!DOCTYPE html>
<html>
    <head>
        <base href="/">
        <link rel="stylesheet" href="/assets/minified/app.css" />
        <script src="/assets/minified/app.js"></script>
    </head>
    <body ng-app="notesApp">
        <a ui-sref="authenticate">Login / Register</a>
        <a ui-sref="account">Account</a>
        <a ui-sref="logout">Logout</a>
        <a ui-sref="noteList">Notes</a>
        <div ui-view></div>
    </body>
</html>
