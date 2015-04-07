<?php

namespace Joelvardy\Storage;

interface UserRepository {

    public function getUserByEmail($email);

    public function createNewUser($email, $password);

}
