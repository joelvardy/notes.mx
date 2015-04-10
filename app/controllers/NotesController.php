<?php

use Joelvardy\Storage\NoteRepository;
use Joelvardy\Transformers\NoteTransformer;
use Joelvardy\Validators\NoteValidator;
use Joelvardy\Validators\ValidatorException;
use Joelvardy\Storage\StorageException;

class NotesController extends ApiController {


    protected $noteValidator;
    protected $note;
    protected $noteTransformer;


    function __construct(NoteValidator $noteValidator, NoteRepository $note, NoteTransformer $noteTransformer) {
        parent::__construct();
        $this->noteValidator = $noteValidator;
        $this->note = $note;
        $this->noteTransformer = $noteTransformer;
    }


    public function index() {

        $notes = $this->note->readNotes(Input::header('user-id'));
        $notes = $this->noteTransformer->transformCollection($notes->toArray());

        return $this->response->respondWithMessage('User notes have been returned', [
            'notes' => $notes
        ]);

    }


    public function store() {

        try {
            $this->noteValidator->validate(Input::only('text'));
        } catch (ValidatorException $e) {
            return $this->response->setStatusCode(400)->respondWithError('Validation failed');
        }

        $noteId = $this->note->createNote(Input::header('user-id'), [
            'text' => Input::get('text')
        ]);

        if ( ! $noteId) {
            return $this->response->setStatusCode(500)->respondWithError('Unable to create note');
        }

        return $this->response->setStatusCode(201)->respondWithMessage('The note was created', [
            'note_id' => $noteId
        ]);

    }


    public function show($id) {

        try {
            $note = $this->note->readNote($id);
        } catch (StorageException $e) {
            // This is actually a "note not found" error - but I don't want to expose how many notes have been created
            return $this->response->setStatusCode(401)->respondWithError('You are not authorised to access this resource');
        }

        if (Input::header('user-id') != $note->user_id) {
            return $this->response->setStatusCode(401)->respondWithError('You are not authorised to access this resource');
        }

        return $this->response->respondWithMessage('Your note has been returned', [
            'note' => $this->noteTransformer->transform($note)
        ]);

    }


    public function update($id) {

        try {
            $note = $this->note->readNote($id);
        } catch (StorageException $e) {
            // This is actually a "note not found" error - but I don't want to expose how many notes have been created
            return $this->response->setStatusCode(401)->respondWithError('You are not authorised to access this resource');
        }

        if (Input::header('user-id') != $note->user_id) {
            return $this->response->setStatusCode(401)->respondWithError('You are not authorised to access this resource');
        }

        try {
            $this->note->updateNote($id, Input::get('text'));
            return $this->response->respondWithMessage('Note has been updated');
        } catch (StorageException $e) {
            return $this->response->setStatusCode(400)->respondWithError('Unable to update note');
        }

    }


    public function destroy($id) {
        //
    }


}
