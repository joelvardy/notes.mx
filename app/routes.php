<?php

Route::get('/', function() {
	return View::make('index');
});

App::missing(function($exception) {
    return Redirect::to('/');
});