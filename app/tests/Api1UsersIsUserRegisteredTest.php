<?php

class Api1UsersIsUserRegisteredTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_unique_user() {

        $response = $this->getJson('/api/v1/users/registered', 'post', [
            'email' => $this->fake->email()
        ]);

        $this->assertResponseOk();
        $this->assertObjectHasAttributes(['registered'], $response);
        $this->assertFalse($response->registered);

    }

    /** @test */
    public function check_existing_user_returns_error() {

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

    protected function getStub() {
        return [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->password(8))
        ];
    }

}
