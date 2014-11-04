<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CascadeOnUserApiKeys extends Migration {


	/**
	 * Run the migrations.
	 */
	public function up() {

		Schema::table('user_api_keys', function(Blueprint $table) {

			$table->dropForeign('user_api_keys_user_id_foreign');
			$table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');

		});

	}


	/**
	 * Reverse the migrations.
	 */
	public function down() {

		Schema::table('user_api_keys', function(Blueprint $table) {

			$table->dropForeign('user_api_keys_user_id_foreign');
			$table->foreign('user_id')->references('id')->on('users');

		});

	}


}
