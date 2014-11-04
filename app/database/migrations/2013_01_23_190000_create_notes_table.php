<?php

use Illuminate\Database\Migrations\Migration;

class CreateNotesTable extends Migration {


	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {

		Schema::create('notes', function($table) {

			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->text('text');
			$table->timestamps();

			$table->foreign('user_id')->references('id')->on('users');

		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {

		Schema::drop('notes');

	}


}
