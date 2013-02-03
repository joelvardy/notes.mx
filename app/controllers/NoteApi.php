<?php

class NoteApi extends BaseController {


	/**
	 * Create note
	 */
	public function create($user_id, $text)
	{

		// Create a new note
		$note = new Note;
		$note->user_id = $user_id;
		$note->text = $text;
		if ($note->save()) {
			return $note->id;
		}

		// Note wasn't created
		return false;

	}


	/**
	 * Save note (or create if it doesn't exist)
	 */
	public function save()
	{

		// Ensure this is an authenticated request
		if ( ! Authentication::authenticate(Request::header('user-id'), Request::header('user-api-key')))
		{
			return Response::json(array(
				'status' => false,
				'authenticated' => false
			));
		}

		// If this is a new note, create it
		if ( ! Input::has('note_id')) {
			$note_id = $this->create(Request::header('user-id'), Input::get('text'));
			return Response::json(array(
				'status' => (boolean) $note_id,
				'note_id' => $note_id
			));
		}

		$response['status'] = false;

		// Load the note
		$note = Note::find(Input::get('note_id'));

		// Ensure there is a note to work with
		if ($note)
		{

			// Ensure the current user is the owner of the note
			if ($note->user_id == Request::header('user-id')) {

				$note->text = Input::get('text');
				if ($note->save())
				{
					$response['status'] = true;
					$response['note_id'] = $note->id;
				}

			}

		}

		// Return response
		return Response::json($response);

	}


	/**
	 * Read note
	 */
	public function read($note_id)
	{

		// Ensure this is an authenticated request
		if ( ! Authentication::authenticate(Request::header('user-id'), Request::header('user-api-key')))
		{
			return Response::json(array(
				'status' => false,
				'authenticated' => false
			));
		}

		$response['status'] = false;

		// Read the note by ID
		$note = Note::find($note_id);

		// Ensure the note was found
		if ($note)
		{

			// Ensure the current note is the owner of the note
			if ($note->user_id == Request::header('user-id')) {

				$response['status'] = true;
				$response['note_id'] = $note->id;
				$response['text'] = $note->text;
				$response['created_at'] = strtotime($note->created_at);
				$response['updated_at'] = strtotime($note->updated_at);

			}

		}

		// Return response
		return Response::json($response);

	}


	/**
	 * Delete note
	 */
	public function delete($note_id)
	{

		// Ensure this is an authenticated request
		if ( ! Authentication::authenticate(Request::header('user-id'), Request::header('user-api-key')))
		{
			return Response::json(array(
				'status' => false,
				'authenticated' => false
			));
		}

		// Read the note by ID
		$note = Note::find($note_id);

		// Ensure the note was found
		if ($note)
		{

			// Ensure the current note is the owner of the note
			if ($note->user_id == Request::header('user-id')) {

				if ($note->delete())
				{
					$status = true;
				}

			}

		}

		// Return response
		return Response::json(array(
			'status' => (isset($status) ? $status : false)
		));

	}


}