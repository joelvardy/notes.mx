<?php

use Illuminate\Database\Migrations\Migration;

class CreateUserApiKeysTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_api_keys', function($table)
		{

			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->string('key')->unique();
			$table->timestamps();

			$table->foreign('user_id')->references('id')->on('users');

		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('user_api_keys');
	}

}