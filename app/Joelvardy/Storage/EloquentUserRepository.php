<?php

namespace Joelvardy\Storage;

use User;

class EloquentUserRepository implements UserRepository {

    public function getUserByEmail($email) {
        return User::where('email', $email)->get();
    }

    public function createUser($email, $password) {

        $user = new User;
        $user->email = $email;
        $user->password = $password;
        $user->save();

        return $user->id;

    }

}
