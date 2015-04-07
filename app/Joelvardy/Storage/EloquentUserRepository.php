<?php

namespace Joelvardy\Storage;

use User;

class EloquentUserRepository implements UserRepository {

    public function getUserByEmail($email) {
        return User::where('email', $email);
    }

    public function createNewUser($email, $password) {
        return User::find($id);
    }

}
