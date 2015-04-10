<?php

class Api1UsersCreateTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_valid_user_is_created() {

        $response = $this->getJson('/api/v1/users', 'post', [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->word())
        ]);

        $this->assertResponseStatus(201);
        $this->assertObjectHasAttributes([
            'message',
            'user_id'
        ], $response);
        $this->assertInternalType('int', $response->user_id);

    }

    /** @test */
    public function check_invalid_user_is_not_created() {

        $response = $this->getJson('/api/v1/users', 'post', [
            'email' => $this->fake->word()
        ]);

        $this->assertResponseStatus(400);
        $this->assertObjectHasAttributes(['error'], $response);

    }

    /** @test */
    public function check_duplicate_user_returns_an_error() {

        $email = $this->fake->email();
        $password = $this->fake->word();

        $this->make('User', [
            'email' => $email,
            'password' => Hash::make($password)
        ]);

        $response = $this->getJson('/api/v1/users', 'post', [
            'email' => $email,
            'password' => $password
        ]);

        $this->assertResponseStatus(400);
        $this->assertObjectHasAttributes(['error'], $response);

    }

    protected function getStub() {
        return [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->word())
        ];
    }

}
