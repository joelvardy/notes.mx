<?php

namespace Joelvardy\Storage;

interface UserRepository {

    public function getUserByEmail($email);

    public function createUser($email, $password);

}
