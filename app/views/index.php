<!DOCTYPE html>
<html>
    <head>
        <base href="/">
        <link rel="stylesheet" href="/assets/minified/app.css" />
        <script src="/assets/minified/app.js"></script>
    </head>
    <body ng-app="notesApp">
        <nav ng-if="authenticated">
            <a ui-sref="noteList">Notes</a>
            <a ui-sref="account">Account</a>
            <a ui-sref="logout">Logout</a>
        </nav>
        <div ui-view></div>
    </body>
</html>
