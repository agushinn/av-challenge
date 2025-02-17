<?php

namespace App\Controller;

/**
 * Class ApiController
 *
 * This controller provides common methods for sending API responses.
 *
 * @package App\Controller
 */
class ApiController
{
    /**
     * Sends a successful response.
     *
     * @param array $data The data to include in the response.
     * @param string $message The message to include in the response.
     * @param int $status The HTTP status code.
     * @return string The JSON-encoded response.
     */
    protected function sendResponse($data = [], $message = 'Success', $status = 200)
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');

        header('Content-Type: application/json');
        header('HTTP/1.1 ' . $status . ' OK');
        return json_encode([
            'success' => true,
            'code'    => $status,
            'message' => $message,
            'data'    => $data,
        ]);
    }

    /**
     * Sends an error response.
     *
     * @param string $message The error message to include in the response.
     * @param int $status The HTTP status code.
     * @return string The JSON-encoded response.
     */
    protected function sendError($message, $status = 500)
    {
        header('Content-Type: application/json');
        header('HTTP/1.1 ' . $status . ' Internal Server Error');
        return json_encode([
            'success' => false,
            'code'    => $status,
            'message' => $message,
            'data'    => [],
        ]);
    }
}
