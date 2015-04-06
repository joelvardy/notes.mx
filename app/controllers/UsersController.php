<?php

use Joelvardy\Validators\UserValidator;
use Joelvardy\Validators\ValidatorException;

class UsersController extends ApiController {


    protected $userValidator;


    function __construct(UserValidator $userValidator) {
        parent::__construct();
        $this->userValidator = $userValidator;
    }

    public function isRegistered() {

        $users = User::where('email', Input::get('email'))->count();

        return $this->respond([
            'registered' => (boolean) $users
        ]);

    }


    public function login() {
        //
    }


    public function logout() {
        //
    }


    public function store() {

        try {
            $this->userValidator->validate(Input::only('email', 'password'));
        } catch (ValidatorException $e) {
            return $this->setStatusCode(400)->respondWithError('Validation failed');
        }

        //

    }


    public function show($id) {
        //
    }


    public function update($id) {
        //
    }


    public function destroy($id) {
        //
    }


}
