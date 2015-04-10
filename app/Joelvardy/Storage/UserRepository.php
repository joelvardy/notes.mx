<?php

namespace Joelvardy\Storage;

interface UserRepository {

    public function createUser(array $input);

    public function readUserByEmail($email);

    public function readUserById($id);

    public function updateUser($id, array $input);

    public function deleteUser($id);

    public function createUserApiKey($id);

    public function deleteExpiredApiKeys();

}
