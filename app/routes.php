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

// Login user
Route::post('user/login', 'UserApi@login');

// Return whether an email is unique
Route::post('user/available', 'UserApi@email_unique');

// Read user details
Route::get('user', 'UserApi@read');

// Create user
Route::post('user', 'UserApi@create');

// Update user
Route::put('user', 'UserApi@update');

// Save note
Route::put('note', 'NoteApi@save');

// Read note
Route::get('note/{id}', 'NoteApi@read')->where('id', '[0-9]+');