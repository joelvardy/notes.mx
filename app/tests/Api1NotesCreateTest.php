<?php

class Api1NotesCreateTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_valid_note_is_created() {

        $this->make('User', [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->name())
        ], false);

        $response = $this->getJson('/api/v1/notes', 'post', [
            'text' => $this->fake->paragraph()
        ], [
            'HTTP_User-Id' => 1
        ]);

        $this->assertResponseStatus(201);
        $this->assertObjectHasAttributes([
            'message',
            'note_id'
        ], $response);
        $this->assertInternalType('int', $response->note_id);

    }

    /** @test */
    public function check_invalid_note_is_not_created() {

        $response = $this->getJson('/api/v1/notes', 'post', []);

        $this->assertResponseStatus(400);
        $this->assertObjectHasAttributes(['error'], $response);

    }

    protected function getStub() {
        return [
            'user_id' => 1,
            'text' => $this->fake->paragraph()
        ];
    }

}
