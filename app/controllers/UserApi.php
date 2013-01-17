<?php

class UserApi extends BaseController {


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
	public function read($user_id)
	{

		// Return user object
		return User::find($user_id)->toJson();

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

			// Add the user to the users table
			$user = new User;
			$user->email = Input::get('email');
			$user->password = Hash::make(Input::get('password'));
			if ($user->save())
			{
				$status = true;
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

			// Update the user
			$user = User::find($user_id);
			$user->password = Hash::make(Input::get('password'));
			if ($user->save())
			{
				$status = true;
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
		if ($user->delete())
		{
			$status = true;
		}

		// Return response
		return Response::json(array(
			'status' => (isset($status) ? $status : false)
		));

	}


}