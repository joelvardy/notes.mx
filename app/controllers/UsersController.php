<?php

use Joelvardy\Validators\UserValidator;
use Joelvardy\Validators\ValidatorException;
use Joelvardy\Storage\UserRepository as User;

class UsersController extends ApiController {


    protected $userValidator;
    protected $user;


    function __construct(UserValidator $userValidator, User $user) {
        parent::__construct();
        $this->userValidator = $userValidator;
        $this->user = $user;
    }

    public function isRegistered() {

        $userCount = $this->user->getUserByEmail(Input::get('email'))->count();

        return $this->respond([
            'registered' => (boolean) $userCount
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
