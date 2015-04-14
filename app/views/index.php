<!DOCTYPE html>
<html>
    <head>
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title>Notes | Keep your notes private!</title>
        <link rel="icon" type="image/png" href="/assets/img/logo.png">
        <script src="//use.typekit.net/jsd0pif.js"></script>
        <script>try{Typekit.load();}catch(e){}</script>
        <link rel="stylesheet" href="/assets/minified/app.css">
        <script src="/assets/minified/app.js"></script>
    </head>
    <body ng-app="notesApp">
        <header class="primary" ng-if="authenticated">
            <nav>
                <a ui-sref="noteList">Notes</a>
                <a class="small-remove" ui-sref="account">Account</a>
                <a class="small-remove" ui-sref="logout">Logout</a>
                <button class="right" ng-if="note" ng-click="removeNote()">Delete</button>
                <button class="right" ng-if="note" ng-click="saveNote()">Save</button>
                <button class="right" ng-if="newNote" ng-click="newNote()">New Note</button>
            </nav>
        </header>
        <div ui-view></div>
    </body>
</html>
