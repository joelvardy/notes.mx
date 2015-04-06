<?php

Route::get('/', [
    'as' => 'index',
    function () {
        return View::make('index');
    }
]);

Route::group(['prefix' => 'api/v1'], function () {

    Route::get('users/registered', [
        'as' => 'api.v1.user.registered',
        'uses' => 'UsersController@isRegistered'
    ]);

    Route::get('users/login', [
        'as' => 'api.v1.user.login',
        'uses' => 'UsersController@login'
    ]);

    Route::get('users/logout', [
        'as' => 'api.v1.user.logout',
        'uses' => 'UsersController@logout'
    ]);

    Route::resource('users', 'UsersController', [
        'only' => [
            'store',
            'show',
            'update',
            'destroy'
        ]
    ]);

});

App::missing(function ($exception) {
    return Redirect::route('index');
});
