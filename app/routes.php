<?php

// Base
Route::get('/', function () {
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

// Delete note
Route::delete('user', 'UserApi@delete');

// Save note
Route::put('note', 'NoteApi@save');

// Read note
Route::get('note/{id}', 'NoteApi@read')->where('id', '[0-9]+');

// Delete note
Route::delete('note/{id}', 'NoteApi@delete')->where('id', '[0-9]+');
