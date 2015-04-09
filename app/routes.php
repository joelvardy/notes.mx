<?php

Route::get('/', [
    'as' => 'index',
    function () {
        return View::make('index');
    }
]);

Route::group(['prefix' => 'api/v1'], function () {

    Route::post('users/registered', [
        'as' => 'api.v1.users.registered',
        'uses' => 'UsersController@isRegistered'
    ]);

    Route::get('users/login', [
        'as' => 'api.v1.users.login',
        'uses' => 'UsersController@login'
    ]);

    Route::get('users/logout', [
        'as' => 'api.v1.users.logout',
        'uses' => 'UsersController@logout'
    ]);

    Route::post('users', [
        'as' => 'api.v1.users.store',
        'uses' => 'UsersController@store'
    ]);

    Route::get('users/{users}', [
        'as' => 'api.v1.users.show',
        'before' => 'auth.api',
        'uses' => 'UsersController@show'
    ]);

    Route::put('users/{users}', [
        'as' => 'api.v1.users.update',
        'before' => 'auth.api',
        'uses' => 'UsersController@update'
    ]);

    Route::delete('users/{users}', [
        'as' => 'api.v1.users.destroy',
        'before' => 'auth.api',
        'uses' => 'UsersController@destroy'
    ]);

});

App::missing(function ($exception) {
    return Redirect::route('index');
});
