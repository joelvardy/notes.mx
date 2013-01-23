<?php

class UserApi extends BaseController {


	/**
	 * Return result of email uniqueness
	 */
	public function email_unique()
	{

		// Return status of authentication
		return Response::json(array(
			'status' => Authentication::email_unique(Input::get('email'))
		));

	}


	/**
	 * Login user
	 */
	public function login()
	{

		// Attempt to authenticate the details
		$response['status'] = Auth::attempt(array(
			'email' => Input::get('email'),
			'password' => Input::get('password')
		));

		// Check the user was successfully logged in
		if ($response['status'])
		{

			// Return the users ID
			$response['user_id'] = Auth::user()->id;

			// Create an API key for this session and return it
			$response['api_key'] = Authentication::create_api_key(Auth::user()->id);

		}

		// Return response
		return Response::json($response);

	}


	/**
	 * Read user
	 */
	public function read()
	{

		// Ensure this is an authenticated request
		if ( ! Authentication::authenticate(Input::get('user_id'), Input::get('api_key')))
		{
			return Response::json(array(
				'status' => false,
				'authenticated' => false
			));
		}

		$response['status'] = false;

		// Read the user by ID
		$user = User::find(Input::get('user_id'));

		// Ensure the user was found
		if ($user)
		{

			$response['status'] = true;

			// Iterate through notes
			foreach ($user->notes as $note) {
				$response['notes'][] = array(
					'note_id' => $note->id,
					'text' => $note->text,
					'created_at' => $note->created_at,
					'updated_at' => $note->updated_at
				);
			}

			$response['id'] = $user->id;
			$response['email'] = $user->email;
			$response['created_at'] = $user->created_at;
			$response['updated_at'] = $user->updated_at;

		}

		// Return response
		return Response::json($response);

	}


	/**
	 * Create user
	 */
	public function create()
	{

		// Validate the data
		$validator = Validator::make(
			array(
				'email' => Input::get('email'),
				'password' => Input::get('password')
			),
			array(
				'email' => 'required|email',
				'password' => 'required|min:5'
			)
		);

		// If the data validates
		if ($validator->passes())
		{

			// Ensure the email is unique
			if (Authentication::email_unique(Input::get('email')))
			{

				// Add the user to the users table
				$user = new User;
				$user->email = Input::get('email');
				$user->password = Hash::make(Input::get('password'));
				if ($user->save())
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


	/**
	 * Update user
	 */
	public function update()
	{

		// Ensure this is an authenticated request
		if ( ! Authentication::authenticate(Input::get('user_id'), Input::get('api_key')))
		{
			return Response::json(array(
				'status' => false,
				'authenticated' => false
			));
		}

		// Validate the data
		$validator = Validator::make(
			array(
				'password' => Input::get('password')
			),
			array(
				'password' => 'required|min:5'
			)
		);

		// If the data validates
		if ($validator->passes())
		{

			// Read the user details
			$user = User::find(Input::get('user_id'));

			// Ensure the user was found
			if ($user)
			{
				$user->password = Hash::make(Input::get('password'));
				if ($user->save())
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