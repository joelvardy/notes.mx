<?php

use Joelvardy\Storage\StorageException;
use Joelvardy\Transformers\UserTransformer;
use Joelvardy\Validators\UserValidator;
use Joelvardy\Validators\ValidatorException;
use Joelvardy\Storage\UserRepository;

class UsersController extends ApiController {


    protected $userValidator;
    protected $user;
    protected $userTransformer;


    function __construct(UserValidator $userValidator, UserRepository $user, UserTransformer $userTransformer) {
        parent::__construct();
        $this->userValidator = $userValidator;
        $this->user = $user;
        $this->userTransformer = $userTransformer;
    }

    public function isRegistered() {

        try {
            $user = $this->user->readUserByEmail(Input::get('email'));
            $registered = (boolean) $user->count();
        } catch (StorageException $e) {
            $registered = false;
        }

        return $this->response->respond([
            'registered' => $registered
        ]);

    }


    public function authenticate() {

        try {
            $this->userValidator->validate(Input::only('email', 'password'));
        } catch (ValidatorException $e) {
            return $this->response->setStatusCode(400)->respondWithError('Validation failed');
        }

        if ( ! Auth::once(Input::only('email', 'password'))) {
            return $this->response->setStatusCode(401)->respondWithError('Invalid login details');
        }

        $user_id = (integer) Auth::id();

        $api_key = $this->user->createUserApiKey($user_id);

        return $this->response->setStatusCode(201)->respondWithMessage('The user was authenticated', [
            'user_id' => $user_id,
            'api_key' => $api_key
        ]);

    }


    public function store() {

        try {
            $this->userValidator->validate(Input::only('email', 'password'));
        } catch (ValidatorException $e) {
            return $this->response->setStatusCode(400)->respondWithError('Validation failed');
        }

        $userId = $this->user->createUser(Input::only('email', 'password'));

        if ( ! $userId) {
            return $this->response->setStatusCode(400)->respondWithError('Unable to create user, probably duplicate email');
        }

        return $this->response->setStatusCode(201)->respondWithMessage('The user was created', [
            'user_id' => $userId
        ]);

    }


    public function show($id) {

        if (Input::header('user-id') != $id) {
            return $this->response->setStatusCode(401)->respondWithError('You are not authorised to access this resource');
        }

        try {
            $user = $this->user->readUserById($id);
        } catch (StorageException $e) {
            return $this->response->setStatusCode(400)->respondWithError('User not found');
        }

        return $this->response->respond(['user' => $this->userTransformer->transform($user)]);

    }


    public function update($id) {

        try {
            $this->userValidator->validate(Input::only('email', 'password'));
        } catch (ValidatorException $e) {
            return $this->response->setStatusCode(400)->respondWithError('Validation failed');
        }

        if (Input::header('user-id') != $id) {
            return $this->response->setStatusCode(401)->respondWithError('You are not authorised to modify this resource');
        }

        try {
            $this->user->updateUser($id, Input::only('email', 'password'));
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
            $this->user->deleteUser($id);
            return $this->response->respondWithMessage('User has been deleted');
        } catch (StorageException $e) {
            return $this->response->setStatusCode(400)->respondWithError('Unable to delete user');
        }

    }


}
