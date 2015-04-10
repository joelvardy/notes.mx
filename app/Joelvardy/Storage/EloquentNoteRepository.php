<?php

namespace Joelvardy\Storage;

use Illuminate\Database\QueryException;
use Note;

class EloquentNoteRepository implements NoteRepository {

    public function createNote($user_id, array $input) {
        try {

            $note = new Note;
            $note->user_id = $user_id;
            $note->text = $input['text'];
            $note->save();

            return $note->id;

        } catch (QueryException $e) {
            return false;
        }
    }

    public function readNotes() {

    }

    public function readNote($id) {

    }

    public function updateNote($id, array $input) {

    }

    public function deleteNote($id) {

    }

}
