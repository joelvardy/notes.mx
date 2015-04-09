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

        return $this->response->respond([
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
            return $this->response->setStatusCode(400)->respondWithError('Validation failed');
        }

        $userId = $this->user->createUser(Input::only('email', 'password'));

        return $this->response->setStatusCode(201)->respondWithMessage('The user was created', [
            'user_id' => $userId
        ]);

    }


    public function show($id) {

        if (Input::header('user-id') != $id) {
            return $this->response->setStatusCode(401)->respondWithError('You are not authorised to modify this resource');
        }

        try {
            $user = $this->user->getUserById($id);
        } catch (StorageException $e) {
            return $this->response->setStatusCode(400)->respondWithError('User not found');
        }

        return $this->response->respond(['user' => $this->userTransformer->transform($user)]);

    }


    public function update($id) {

        if (Input::header('user-id') != $id) {
            return $this->response->setStatusCode(401)->respondWithError('You are not authorised to modify this resource');
        }

        try {
            $this->user->updateUserById($id, Input::only('email', 'password'));
            return $this->response->respondWithMessage('User has been updated');
        } catch (StorageException $e) {
            return $this->response->setStatusCode(400)->respondWithError('Unable to update user');
        }

    }


    public function destroy($id) {

        if (Input::header('user-id') != $id) {
            return $this->response->setStatusCode(401)->respondWithError('You are not authorised to modify this resource');
        }

        try {
            $this->user->deleteUserById($id);
            return $this->response->respondWithMessage('User has been deleted');
        } catch (StorageException $e) {
            return $this->response->setStatusCode(400)->respondWithError('Unable to delete user');
        }

    }


}
