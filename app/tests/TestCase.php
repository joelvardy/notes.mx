<?php

use Faker\Factory as Faker;

class TestCase extends Illuminate\Foundation\Testing\TestCase {

    protected $fake;

    function __construct () {
        $this->fake = Faker::create();
    }

	/**
	 * Creates the application.
	 *
	 * @return \Symfony\Component\HttpKernel\HttpKernelInterface
	 */
	public function createApplication()
	{
		$unitTesting = true;

		$testEnvironment = 'testing';

		return require __DIR__.'/../../bootstrap/start.php';
	}

}
