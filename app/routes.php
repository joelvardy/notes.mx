<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// Base
Route::get('/', function()
{
	return View::make('index');
});

// Authenticate user
Route::post('user/login', 'User@login');

// Update user
Route::get('user/{id?}', 'User@read');

// Create user
Route::post('user', 'User@create');

// Update user
Route::put('user/{id}', 'User@update')->where('id', '[0-9]+');

// Delete user
Route::delete('user/{id}', 'User@delete')->where('id', '[0-9]+');