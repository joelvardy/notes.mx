<?php

class Api1UsersAuthenticationTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_valid_user_is_authenticated() {

        $email = $this->fake->email();
        $password = $this->fake->word();

        $this->make('User', [
            'email' => $email,
            'password' => Hash::make($password)
        ]);

        $response = $this->getJson('/api/v1/users/authenticate', 'post', [
            'email' => $email,
            'password' => $password
        ]);

        $this->assertResponseStatus(201);
        $this->assertObjectHasAttributes(['message', 'user_id', 'api_key'], $response);
        $this->assertInternalType('int', $response->user_id);
        $this->assertInternalType('string', $response->api_key);

    }

    /** @test */
    public function check_invalid_details_return_error() {

        $response = $this->getJson('/api/v1/users/authenticate', 'post', [
            'email' => $this->fake->name()
        ]);

        $this->assertResponseStatus(400);
        $this->assertObjectHasAttributes(['error'], $response);

    }

    /** @test */
    public function check_invalid_user_is_not_authenticated() {

        $response = $this->getJson('/api/v1/users/authenticate', 'post', [
            'email' => $this->fake->email(),
            'password' => $this->fake->word()
        ]);

        $this->assertResponseStatus(401);
        $this->assertObjectHasAttributes(['error'], $response);

    }

    protected function getStub() {
        return [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->word())
        ];
    }

}
