<?php

namespace Joelvardy\Validators;

class NoteValidator extends Validator {

    protected static $rules = [
        'text' => 'required'
    ];

}
