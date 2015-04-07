<?php

namespace Joelvardy\Storage;

use User;

class EloquentUserRepository implements UserRepository {

    public function createUser(array $input) {

        $user = new User;
        $user->email = $input['email'];
        $user->password = $input['password'];
        $user->save();

        return $user->id;

    }

    public function returnUser($user) {
        if ( ! $user) throw new StorageException('User could not be found');
        return $user->get();
    }

    public function getUserByEmail($email) {
        $user = User::where('email', $email);
        return $this->returnUser($user);
    }

    public function getUserById($id) {
        $user = User::find($id);
        return $this->returnUser($user);
    }

    public function updateUserById($id, array $input) {

        $user = $this->getUserById($id);

        if (isset($input['email'])) {
            $user->email = $input['email'];
        }

        if (isset($input['password'])) {
            $user->password = $input['password'];
        }

        return (boolean) $user->save();

    }

    public function deleteUserById($id) {
        $user = $this->getUserById($id);
        return (boolean) $user->delete();
    }

}
