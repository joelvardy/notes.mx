<?php

namespace Joelvardy\Storage;

use Illuminate\Database\QueryException;
use Note;
use User;

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

    public function readNotes($user_id) {

        $user = User::find($user_id);
        if ( ! $user) throw new StorageException('User could not be found');
        return $user->notes()->get();

    }

    public function readNote($id) {

        $note = Note::find($id);
        if ( ! $note) throw new StorageException('Note could not be found');
        return $note;

    }

    public function updateNote($id, $text) {

        $note = Note::find($id);
        if ( ! $note) throw new StorageException('Note could not be found');
        $note->text = $text;
        return $note->save();

    }

    public function deleteNote($id) {

    }

}
