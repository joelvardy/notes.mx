<?php

use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {


	/**
	 * Run the migrations.
	 */
	public function up() {

		Schema::create('users', function($table) {
			$table->increments('id');
			$table->string('email')->unique();
			$table->string('password');
			$table->timestamps();
		});

	}


	/**
	 * Reverse the migrations.
	 */
	public function down() {

		Schema::drop('users');

	}


}
