<?php

use Joelvardy\Storage\StorageException;
use Joelvardy\Transformers\UserTransformer;
use Joelvardy\Validators\UserValidator;
use Joelvardy\Validators\ValidatorException;
use Joelvardy\Storage\UserRepository as User;

class UsersController extends ApiController {


    protected $userValidator;
    protected $user;
    protected $userTransformer;


    function __construct(UserValidator $userValidator, User $user, UserTransformer $userTransformer) {
        parent::__construct();
        $this->userValidator = $userValidator;
        $this->user = $user;
        $this->userTransformer = $userTransformer;
    }

    public function isRegistered() {

        try {
            $user = $this->user->getUserByEmail(Input::get('email'));
            $registered = (boolean) $user->count();
        } catch (StorageException $e) {
            $registered = false;
        }

        return $this->respond([
            'registered' => $registered
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

        $userId = $this->user->createUser(Input::only('email', 'password'));

        return $this->setStatusCode(201)->respondWithMessage('The user was created', [
            'user_id' => $userId
        ]);

    }


    public function show($id) {

        // Authentication
        // return $this->setStatusCode(404)->respondWithError('Authentication error');

        try {
            $user = $this->user->getUserById($id);
        } catch (StorageException $e) {
            return $this->setStatusCode(400)->respondWithError('User not found');
        }

        return $this->respond(['user' => $this->userTransformer->transform($user)]);

    }


    public function update($id) {

        // Authentication
        // return $this->setStatusCode(404)->respondWithError('Authentication error');

        try {
            $this->user->updateUserById($id, Input::only('email', 'password'));
            return $this->respondWithMessage('User has been updated');
        } catch (StorageException $e) {
            return $this->setStatusCode(400)->respondWithError('User not found');
        }

    }


    public function destroy($id) {
        //
    }


}
