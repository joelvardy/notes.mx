<?php

class Api1NotesUpdateTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_a_valid_note_can_be_updated() {

        $this->make('User', [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->name())
        ], false);

        $this->make('Note');

        $response = $this->getJson('/api/v1/notes/1', 'put', [
            'text' => $this->fake->paragraph()
        ], [
            'HTTP_User-Id' => 1
        ]);

        $this->assertResponseOk();
        $this->assertObjectHasAttributes(['message'], $response);

    }

    /** @test */
    public function check_updating_a_note_with_invalid_data_returns_error() {

        $this->make('User', [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->name())
        ], false);

        $this->make('Note');

        $response = $this->getJson('/api/v1/notes/1', 'put', [], [
            'HTTP_User-Id' => 1
        ]);

        $this->assertResponseStatus(400);
        $this->assertObjectHasAttributes(['error'], $response);

    }

    /** @test */
    public function check_updating_note_which_does_not_exist_returns_error() {

        $response = $this->getJson('/api/v1/notes/1', 'put', [
            'text' => $this->fake->paragraph()
        ]);

        $this->assertResponseStatus(401);
        $this->assertObjectHasAttributes(['error'], $response);

    }

    protected function getStub() {
        return [
            'user_id' => 1,
            'text' => $this->fake->paragraph()
        ];
    }

}
