<?php

namespace Joelvardy\Storage;

use Illuminate\Database\QueryException;
use User;
use UserApiKey;

class EloquentUserRepository implements UserRepository {

    public function createUser(array $input) {
        try {

            $user = new User;
            $user->email = $input['email'];
            $user->password = $input['password'];
            $user->save();

            return $user->id;

        } catch (QueryException $e) {
            return false;
        }
    }

    public function returnUser($user) {
        if ( ! $user) throw new StorageException('User could not be found');
        return $user;
    }

    public function getUserByEmail($email) {
        $user = User::where('email', $email)->first();
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

    public function createUserApiKey($id) {

        $user = $this->getUserById($id);

        $api_key = new UserApiKey();
        $api_key->key = str_random(32);
        if ( ! $user->api_keys()->save($api_key)) return false;

        return $api_key->key;

    }

    public function deleteExpiredApiKeys() {
        // Delete all keys which are 3 hours old
        return UserApiKey::where('created_at', '<', date('Y-m-d H:i:s', strtotime('-3 hour')))->delete();
    }

}
