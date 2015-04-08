<?php

namespace Joelvardy\Transformers;

class UserTransformer extends Transformer {

    public function transform($user) {
        return [
            'id' => (int) $user->id,
            'email' => (string) $user->email
        ];
    }

}
