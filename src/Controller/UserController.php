<?php

namespace App\Controller;

use App\Controller\ApiController;

/**
 * Class UserController
 *
 * This controller handles the user-related actions.
 *
 * @package App\Controller
 */
class UserController extends ApiController
{
    private $userService;

    /**
     * UserController constructor.
     *
     * @param mixed $service The user service instance.
     */
    public function __construct($service)
    {
        $this->userService = $service;
    }

    /**
     * Creates a new user.
     *
     * @param array $request The request parameters containing user details.
     * @return mixed The response of the user creation.
     */
    public function createUser($request)
    {
        try {
            $result = $this->userService->createUser($request);
            return $this->sendResponse($result, 'User created successfully', 201);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }
}
