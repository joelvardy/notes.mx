<?php

namespace Joelvardy\Transformers;

class NoteTransformer extends Transformer {

    public function transform($note) {
        return [
            'id' => (int) $note->id,
            'text' => (string) $note->text
        ];
    }

}
