<?php

use Joelvardy\Storage\StorageException;

App::before(function ($request) {
    //
});


App::after(function ($request, $response) {
    //
});

Route::filter('auth', function () {
    if (Auth::guest()) {
        if (Request::ajax()) {
            return Response::make('Unauthorized', 401);
        } else {
            return Redirect::guest('login');
        }
    }
});

Route::filter('auth.basic', function () {
    return Auth::basic();
});

Route::filter('guest', function () {
    if (Auth::check()) return Redirect::to('/');
});

Route::filter('csrf', function () {
    if (Session::token() !== Input::get('_token')) {
        throw new Illuminate\Session\TokenMismatchException;
    }
});

Route::filter('auth.api', function () {

    $response = App::make('Joelvardy\Responders\JsonResponder');
    $userRepository = App::make('Joelvardy\Storage\UserRepository');

    $user_id = Input::header('user-id', false);
    $api_key = Input::header('user-api-key', false);
    if ($user_id && $api_key) {

        try {

            $user = $userRepository->getUserById($user_id);

            if ($user->api_keys()->where('key', '=', $api_key)->count()) return;

        } catch (StorageException $e) {
            //
        }

    }

    return $response->setStatusCode(401)->respondWithError('Authentication error');

});
