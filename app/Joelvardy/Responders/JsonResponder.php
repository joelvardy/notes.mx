<?php

namespace Joelvardy\Responders;

use Response;

class JsonResponder {

    protected $statusCode = 200;
    protected $response;


    function __construct(Response $response) {
        $this->response = $response;
    }


    public function setStatusCode($statusCode) {
        $this->statusCode = $statusCode;
        return $this;
    }


    public function getStatusCode() {
        return $this->statusCode;
    }


    public function respond($data, $headers = []) {
        return $this->response->json($data, $this->getStatusCode(), $headers);
    }

    public function respondWithError($message) {
        return $this->respond([
            'error' => [
                'message' => $message,
                'code' => $this->getStatusCode()
            ]
        ]);
    }

    public function respondWithMessage($message, $data = []) {
        return $this->respond(array_merge($data, [
            'message' => $message
        ]));
    }

}
