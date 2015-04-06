<?php

namespace Joelvardy\Validators;

class UserValidator extends Validator {

    protected static $rules = [
        'email' => 'required',
        'password' => 'required'
    ];

}
