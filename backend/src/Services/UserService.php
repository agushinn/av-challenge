<?php
// API -> CONTROLLER -> SERVICE -> REPOSITORY -> DATABASE/CURL

namespace App\Services;

use App\Repositories\UserRepository;

/**
 * Class UserService
 *
 * This service handles the business logic for users.
 *
 * @package App\Services
 */
class UserService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
 
    /**
     * Creates a new user.
     *
     * @param array $request The request parameters containing user details.
     * @return array The result of the user creation.
     * @throws \Exception If any required parameter is missing or invalid.
     */
    public function createUser($request)
    {
        $name = htmlspecialchars($request['name']);
        $email = filter_var($request['email'], FILTER_VALIDATE_EMAIL);
        $password = htmlspecialchars($request['password']);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $newsletterSuscribed = isset($request['newsletter_suscribed']) && $request['newsletter_suscribed'] ? 1 : 0;


        if (empty($name)) {
            throw new \Exception('Name is required');
        }

        if (empty($email)) {
            throw new \Exception('Email is required');
        }

        if (empty($password)) {
            throw new \Exception('Password is required');
        }

        if ($newsletterSuscribed === null) {
            throw new \Exception('Newsletter suscribed is required');
        }

        return $this->userRepository->createUser($name, $email, $hashedPassword, $newsletterSuscribed);
    }

    /**
     * Retrieves all users subscribed to the newsletter.
     *
     * @return array The list of users subscribed to the newsletter.
     */
    public function getAllUsersSuscribedToNewsletter()
    {
        return $this->userRepository->getAllUsersSuscribedToNewsletter();
    }
}
