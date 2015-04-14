<?php

namespace Joelvardy\Storage;

use Illuminate\Database\QueryException;
use \Hash;
use User;
use UserApiKey;

class EloquentUserRepository implements UserRepository {

    public function createUser(array $input) {
        try {

            $user = new User;
            $user->email = $input['email'];
            $user->password = Hash::make($input['password']);
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

    public function readUserByEmail($email) {
        $user = User::where('email', $email)->first();
        return $this->returnUser($user);
    }

    public function readUserById($id) {
        $user = User::find($id);
        return $this->returnUser($user);
    }

    public function updateUser($id, array $input) {

        $user = $this->readUserById($id);

        if (isset($input['email'])) {
            $user->email = $input['email'];
        }

        if (isset($input['password']) && $input['password']!= '') {
            $user->password = Hash::make($input['password']);
        }

        return (boolean) $user->save();

    }

    public function deleteUser($id) {
        $user = $this->readUserById($id);
        return (boolean) $user->delete();
    }

    public function createUserApiKey($id) {

        $user = $this->readUserById($id);

        $api_key = new UserApiKey();
        $api_key->key = str_random(32);
        if ( ! $user->api_keys()->save($api_key)) return false;

        return $api_key->key;

    }

    public function deleteExpiredApiKeys() {
        // Delete all keys which are 5 days old
        return UserApiKey::where('created_at', '<', date('Y-m-d H:i:s', strtotime('-5 day')))->delete();
    }

}
