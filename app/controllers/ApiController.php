<?php

class ApiController extends \BaseController {

    protected $response;

    function __construct() {
        $this->response = App::make('Joelvardy\Responders\JsonResponder');
        Config::set('session.driver', 'array');
    }

}
