<?php

class ApplicationHtmlTest extends TestCase {

    /** @test */
    public function load_index_page() {

        $this->call('get', '/');

        $this->assertResponseOk();

    }

}
