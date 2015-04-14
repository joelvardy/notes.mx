<?php

Route::get('/', [
    'as' => 'index',
    function () {
        return View::make('index');
    }
]);

Route::group(['prefix' => 'api/v1'], function () {


    /* Users */

    Route::post('users/registered', [
        'as' => 'api.v1.users.registered',
        'uses' => 'UsersController@isRegistered'
    ]);

    Route::post('users/authenticate', [
        'as' => 'api.v1.users.authenticate',
        'uses' => 'UsersController@authenticate'
    ]);

    Route::post('users', [
        'as' => 'api.v1.users.store',
        'uses' => 'UsersController@store'
    ]);


    /* Requires valid user-id and user-api-key headers */

    Route::group(['before' => 'auth.api'], function () {


        /* Users */

        Route::get('users/{users}', [
            'as' => 'api.v1.users.show',
            'uses' => 'UsersController@show'
        ]);

        Route::put('users/{users}', [
            'as' => 'api.v1.users.update',
            'uses' => 'UsersController@update'
        ]);

        Route::delete('users/{users}', [
            'as' => 'api.v1.users.destroy',
            'uses' => 'UsersController@destroy'
        ]);


        /* Notes */

        Route::get('notes', [
            'as' => 'api.v1.notes.index',
            'uses' => 'NotesController@index'
        ]);

        Route::post('notes', [
            'as' => 'api.v1.notes.store',
            'uses' => 'NotesController@store'
        ]);

        Route::get('notes/{notes}', [
            'as' => 'api.v1.notes.show',
            'uses' => 'NotesController@show'
        ]);

        Route::put('notes/{notes}', [
            'as' => 'api.v1.notes.update',
            'uses' => 'NotesController@update'
        ]);

        Route::delete('notes/{notes}', [
            'as' => 'api.v1.notes.destroy',
            'uses' => 'NotesController@destroy'
        ]);


    });


});

App::missing(function () {
    return View::make('index');
});
