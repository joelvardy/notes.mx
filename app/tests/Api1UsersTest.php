<?php

class Api1UsersTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_non_existing_user_is_registered() {

        $response = $this->getJson('/api/v1/users/registered');

        $this->assertResponseOk();
        $this->assertObjectHasAttributes(['registered'], $response);
        $this->assertFalse($response->registered);

    }

    /** @test */
    public function check_existing_user_is_registered() {

        $email = $this->fake->email();

        $this->make('User', [
            'email' => $email
        ]);

        $response = $this->getJson('/api/v1/users/registered?email='.$email);

        $this->assertResponseOk();
        $this->assertObjectHasAttributes(['registered'], $response);
        $this->assertTrue($response->registered);

    }

    protected function getStub() {
        return [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->word())
        ];
    }

}
