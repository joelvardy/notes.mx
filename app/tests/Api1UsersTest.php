<?php

class Api1UsersTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_valid_user_is_registered() {

        $response = $this->getJson('/api/v1/users/registered', 'post', [
            'email' => $this->fake->email()
        ]);

        $this->assertResponseOk();
        $this->assertObjectHasAttributes(['registered'], $response);
        $this->assertFalse($response->registered);

    }

    /** @test */
    public function check_existing_user_is_not_registered() {

        $email = $this->fake->email();

        $this->make('User', [
            'email' => $email
        ]);

        $response = $this->getJson('/api/v1/users/registered', 'post', [
            'email' => $email
        ]);

        $this->assertResponseOk();
        $this->assertObjectHasAttributes(['registered'], $response);
        $this->assertTrue($response->registered);

    }

    /** @test */
    public function check_valid_user_is_created() {

        $response = $this->getJson('/api/v1/users', 'post', [
            'email' => $this->fake->email(),
            'password' => $this->fake->word()
        ]);

        $this->assertResponseStatus(201);
        $this->assertObjectHasAttributes(['message', 'user_id'], $response);
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

    protected function getStub() {
        return [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->word())
        ];
    }

}
