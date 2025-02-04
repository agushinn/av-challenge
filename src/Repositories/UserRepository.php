<?php

namespace App\Repositories;

use App\Database\Database;

/**
 * Class UserRepository
 *
 * This repository handles the database interactions for users.
 *
 * @package App\Repositories
 */
class UserRepository
{
    private $connection;

    public function __construct($config)
    {
        $database = new Database($config);
        $this->connection = $database->getConnection();
    }

    /**
     * Creates a new user in the database.
     *
     * @param string $name The name of the user.
     * @param string $email The email of the user.
     * @param string $password The hashed password of the user.
     * @param bool $newsletterSuscribed Whether the user is subscribed to the newsletter.
     * @return array The result of the user creation.
     * @throws \Exception If there is an error creating the user.
     */
    public function createUser($name, $email, $password, $newsletterSuscribed)
    {
        try {
            $this->connection->beginTransaction();

            $query = "INSERT INTO users (name, email, password, newsletter_suscribed) VALUES (:name, :email, :password, :newsletter_suscribed)";
            $stmt = $this->connection->prepare($query);

            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':newsletter_suscribed', $newsletterSuscribed);

            if (!$stmt->execute()) {
                $this->connection->rollBack();
                throw new \Exception('Error creating user');
            }

            $this->connection->commit();

            return ['message' => sprintf('User %s created successfully', $name)];
        } catch (\Exception $e) {
            $this->connection->rollBack();
            throw $e;
        }
    }

    /**
     * Retrieves all users subscribed to the newsletter.
     *
     * @return array The list of email addresses of users subscribed to the newsletter.
     * @throws \Exception If there is an error fetching the users.
     */
    public function getAllUsersSuscribedToNewsletter()
    {
        try {
            $query = "SELECT email FROM users WHERE newsletter_suscribed = 1";
            $stmt = $this->connection->prepare($query);

            if (!$stmt->execute()) {
                throw new \Exception('Error fetching users');
            }

            return $stmt->fetchAll(\PDO::FETCH_COLUMN, 0);
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
