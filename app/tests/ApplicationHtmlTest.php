<?php

class ApplicationHtmlTest extends TestCase {

    /** @test */
    public function load_index_page () {

        $response = $this->call('get', '/');

        $this->assertResponseOk();

    }

}
