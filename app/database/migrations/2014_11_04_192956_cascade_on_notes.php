<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CascadeOnNotes extends Migration {


	/**
	 * Run the migrations.
	 */
	public function up() {

		Schema::table('notes', function(Blueprint $table) {

			$table->dropForeign('notes_user_id_foreign');
			$table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');

		});

	}


	/**
	 * Reverse the migrations.
	 */
	public function down() {

		Schema::table('notes', function(Blueprint $table) {

			$table->dropForeign('notes_user_id_foreign');
			$table->foreign('user_id')->references('id')->on('users');

		});

	}


}
