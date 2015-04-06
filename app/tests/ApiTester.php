<?php

use Faker\Factory as Faker;

abstract class ApiTester extends TestCase {

    protected $fake;

    function __construct() {
        $this->fake = Faker::create();
    }

    public function setUp() {

        parent::setUp();

        $this->app['artisan']->call('migrate');

    }

    protected function getJson($uri, $method = 'get', $parameters = []) {
        return json_decode($this->call($method, $uri, $parameters)->getContent());
    }

    protected function assertObjectHasAttributes($attributes, $object) {
        foreach ($attributes as $attribute) {
            $this->assertObjectHasAttribute($attribute, $object);
        }
    }

}
