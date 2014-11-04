<?php

class Authentication {


	/**
	 * Return whether the email is unique
	 */
	public static function email_unique($email) {

		// Return boolean
		return ! (boolean) User::where('email', '=', $email)->count();

	}


	/**
	 * Add an API key
	 */
	public static function create_api_key($user_id) {

		// Generate API key
		$key = substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 32);

		// Define the API key
		$api_key = new ApiKey();
		$api_key->key = $key;

		// Read the user
		$user = User::find($user_id);

		// Ensure the user was found
		if ($user) {

			// Insert the API key
			$user->api_keys()->save($api_key);

			return $key;

		}

		return false;

	}


	/**
	 * Remove all expired API keys
	 */
	public static function remove_expired_api_keys() {

		// Delete all keys which are 3 hours old
		return ApiKey::where('created_at', '<', date('Y-m-d H:i:s', strtotime('-3 hour')))->delete();

	}


	/**
	 * Authenticate user by ID and API key
	 */
	public static function authenticate($user_id, $api_key) {

		// Remove expired API keys
		self::remove_expired_api_keys();

		// Read the user matching the user ID
		$user = User::find($user_id);

		// Ensure there
		if ($user) {
			// Return boolean based on the number of matching API keys
			return (boolean) $user->api_keys()->where('key', '=', $api_key)->count();
		}

		return false;

	}


}
