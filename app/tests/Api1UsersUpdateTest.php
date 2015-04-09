<?php

class Api1UsersUpdateTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_valid_user_is_updated() {

        $this->make('User');

        $response = $this->getJson('/api/v1/users/1', 'put', [
            'email' => $this->fake->email(),
            'password' => $this->fake->word()
        ], [
            'HTTP_User-Id' => 1
        ]);

        $this->assertResponseOk();
        $this->assertObjectHasAttributes(['message'], $response);

    }

    /** @test */
    public function check_trying_to_update_different_user_returns_an_error() {

        $response = $this->getJson('/api/v1/users/1', 'put', [
            'email' => $this->fake->email(),
            'password' => $this->fake->word()
        ], [
            'HTTP_User-Id' => 2
        ]);

        $this->assertResponseStatus(401);
        $this->assertObjectHasAttributes(['error'], $response);

    }

    /** @test */
    public function check_updating_invalid_user_returns_an_error() {

        $response = $this->getJson('/api/v1/users/1', 'put', [
            'email' => $this->fake->email(),
            'password' => $this->fake->word()
        ], [
            'HTTP_User-Id' => 1
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
