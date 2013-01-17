<?php

class UserApi extends BaseController {


	/**
	 * Return whether the email is unique
	 */
	public function email_unique($email)
	{

		// Return boolean
		return ! (boolean) User::where('email', '=', $email)->count();

	}


	/**
	 * Add an API key
	 */
	public function create_api_key($user_id)
	{

		// Generate API key
		$key = substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 32);

		// Define the API key
		$api_key = new ApiKeys(array(
			'key' => $key
		));

		// Read the user
		$user = User::find($user_id);

		// Ensure the user was found
		if ($user)
		{
			// Insert the API key
			$user->api_keys()->save($api_key);
			return $key;
		}

		return false;

	}


	/**
	 * Remove all expired API keys
	 */
	public function remove_expired_api_keys()
	{

		// Delete all keys which are 3 hours old
		return ApiKeys::where('created_at', '<', date('Y-m-d H:i:s', strtotime('-3 hour')))->delete();

	}


	/**
	 * Authenticate user by email and API key
	 */
	public function authenticate($email, $api_key)
	{

		// Remove expired API keys
		$this->remove_expired_api_keys();

		// Read the user matching the email address
		$user = User::where('email', '=', $email)->first();

		// Ensure there
		if ($user)
		{
			// Return boolean based on the number of matching API keys
			return (boolean) $user->api_keys()->where('key', '=', $api_key)->count();
		}

		return false;

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

		// If the user logged in return their ID
		if ($response['status'])
		{
			$response['user_id'] = Auth::user()->id;
		}

		// Return response
		return Response::json($response);

	}


	/**
	 * Read user
	 */
	public function read($user_id = false)
	{

		// Ensure this is an authenticated request
		if ( ! $this->authenticate(Input::get('email'), Input::get('api_key')))
		{
			return Response::json(array(
				'status' => false,
				'authenticated' => false
			));
		}

		// If a user ID has been passed return the data for that user
		if ( ! $user_id && Auth::user())
		{
			$user_id = Auth::user()->id;
		}

		$response['status'] = false;

		// Ensure there is a valid user ID
		if (is_numeric($user_id))
		{

			// Read the user details
			$user = User::find($user_id);

			// Ensure the user was found
			if ($user)
			{
				$response['status'] = true;
				$response['id'] = $user->id;
				$response['email'] = $user->email;
				$response['created_ad'] = $user->created_ad;
				$response['updated_at'] = $user->updated_at;
			}

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
			if ($this->email_unique(Input::get('email')))
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
	public function update($user_id)
	{

		// Ensure this is an authenticated request
		if ( ! $this->authenticate(Input::get('email'), Input::get('api_key')))
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
			$user = User::find($user_id);

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


	/**
	 * Delete user
	 */
	public function delete($user_id)
	{

		// Delete the user
		$user = User::find($user_id);
		if ($user && $user->delete())
		{
			$status = true;
		}

		// Return response
		return Response::json(array(
			'status' => (isset($status) ? $status : false)
		));

	}


}