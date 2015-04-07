<?php

namespace Joelvardy\Storage;

interface UserRepository {

    public function createUser(array $input);

    public function getUserByEmail($email);

    public function getUserById($id);

    public function updateUserById($id, array $input);

    public function deleteUserById($id);

}
