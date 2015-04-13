<?php

class Api1UsersReadTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_valid_user_could_be_read() {

        $this->make('User');

        $response = $this->getJson('/api/v1/users/1', 'get', [], [
            'HTTP_User-Id' => 1
        ]);

        $this->assertResponseOk();
        $this->assertObjectHasAttributes(['user'], $response);
        $this->assertInternalType('int', $response->user->id);
        $this->assertInternalType('string', $response->user->email);

    }

    /** @test */
    public function check_trying_to_read_different_user_returns_an_error() {

        $response = $this->getJson('/api/v1/users/1', 'get', [], [
            'HTTP_User-Id' => 2
        ]);

        $this->assertResponseStatus(401);
        $this->assertObjectHasAttributes(['error'], $response);

    }

    /** @test */
    public function check_invalid_user_returns_error() {

        $response = $this->getJson('/api/v1/users/1', 'get', [], [
            'HTTP_User-Id' => 1
        ]);

        $this->assertResponseStatus(400);
        $this->assertObjectHasAttributes(['error'], $response);

    }

    protected function getStub() {
        return [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->password(8))
        ];
    }

}
