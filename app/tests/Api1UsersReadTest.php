<?php

class Api1UsersReadTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_valid_user_could_be_read() {

        $this->make('User', [
            'email' => $this->fake->email(),
            'password' => $this->fake->name()
        ]);

        $response = $this->getJson('/api/v1/users/1');

        $this->assertResponseOk();
        $this->assertObjectHasAttributes(['user'], $response);
        $this->assertInternalType('int', $response->user->id);
        $this->assertInternalType('string', $response->user->email);

    }

    /** @test */
    public function check_invalid_user_returns_error() {

        $response = $this->getJson('/api/v1/users/1');

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
