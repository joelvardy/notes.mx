<?php

namespace Joelvardy\Transformers;

class NoteTransformer extends Transformer {

    public function transform($note) {
        $note = (object) $note;
        return [
            'id' => (int) $note->id,
            'updated' => $note->updated_at,
            'text' => (string) $note->text
        ];
    }

}
