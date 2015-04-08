<?php

class Api1UsersDeleteTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_valid_user_is_deleted() {

        $this->make('User');

        $response = $this->getJson('/api/v1/users/1', 'delete');

        $this->assertResponseOk();
        $this->assertObjectHasAttributes(['message'], $response);

    }

    /** @test */
    public function check_invalid_user_returns_error_or_delete() {

        $response = $this->getJson('/api/v1/users/1', 'delete');

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
