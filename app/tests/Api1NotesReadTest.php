<?php

class Api1NotesReadTest extends ApiTester {

    use TestingFactory;

    /** @test */
    public function check_reading_empty_set_of_notes_returns_an_array() {

        $this->make('User', [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->name())
        ], false);

        $response = $this->getJson('/api/v1/notes', 'get', [], [
            'HTTP_User-Id' => 1
        ]);

        $this->assertResponseOk();
        $this->assertObjectHasAttributes([
            'message',
            'notes'
        ], $response);
        $this->assertInternalType('array', $response->notes);
        $this->assertEquals(0, count($response->notes));

    }

    /** @test */
    public function check_reading_users_notes_returns_notes() {

        $this->make('User', [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->name())
        ], false);

        $this->times(5)->make('Note');

        $response = $this->getJson('/api/v1/notes', 'get', [], [
            'HTTP_User-Id' => 1
        ]);

        $this->assertResponseOk();
        $this->assertObjectHasAttributes([
            'message',
            'notes'
        ], $response);
        $this->assertInternalType('array', $response->notes);
        $this->assertEquals(5, count($response->notes));
        $this->assertInternalType('int', $response->notes[0]->id);
        $this->assertInternalType('int', $response->notes[0]->updated);
        $this->assertInternalType('string', $response->notes[0]->text);

    }

    /** @test */
    public function check_reading_specific_note() {

        $this->make('User', [
            'email' => $this->fake->email(),
            'password' => Hash::make($this->fake->name())
        ], false);

        $this->make('Note');

        $response = $this->getJson('/api/v1/notes/1', 'get', [], [
            'HTTP_User-Id' => 1
        ]);

        $this->assertResponseOk();
        $this->assertObjectHasAttributes([
            'message',
            'note'
        ], $response);
        $this->assertInternalType('int', $response->note->id);
        $this->assertInternalType('int', $response->note->updated);
        $this->assertInternalType('string', $response->note->text);

    }

    /** @test */
    public function check_reading_note_which_does_not_exist_returns_error() {

        $response = $this->getJson('/api/v1/notes/1', 'get');

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
