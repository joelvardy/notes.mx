<?php

class ApiController extends \BaseController {


    protected $statusCode = 200;
    protected $response;


    function __construct() {
        $this->response = App::make('Response');
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
