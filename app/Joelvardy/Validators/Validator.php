<?php

namespace Joelvardy\Validators;

abstract class Validator {

    protected $validator;

    function __construct(\Illuminate\Validation\Factory $validator) {
        $this->validator = $validator;
    }

    public function validate($input) {

        $validator = $this->validator->make($input, static::$rules);

        if ($validator->passes()) return true;

        throw new ValidatorException;

    }

}
