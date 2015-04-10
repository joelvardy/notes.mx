<?php

namespace Joelvardy\Storage;

interface NoteRepository {

    public function createNote($user_id, array $input);

    public function readNotes($user_id);

    public function readNote($id);

    public function updateNote($id, array $input);

    public function deleteNote($id);

}
