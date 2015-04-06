<?php

trait TestingFactory {

    protected $times = 1;

    protected function times($count) {
        $this->times = $count;
        return $this;
    }

    protected function make($type, $fields = []) {
        $fields = array_merge($this->getStub(), $fields);
        while ($this->times--) $type::create($fields);
    }

    protected function getStub() {
        throw new BadMethodCallException('Create getStub method to declare fields.');
    }

}
