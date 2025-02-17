<?php

namespace App\Database;

/**
 * Class Database
 *
 * This class handles the database connection.
 *
 * @package App\Database
 */
class Database
{
    private $host;
    private $user;
    private $password;
    private $database;

    /**
     * Database constructor.
     *
     * @param array $config The database configuration parameters.
     */
    public function __construct($config)
    {
        $this->host = $config['host'] . ':' . $config['port'];
        $this->user = $config['user'];
        $this->password = $config['password'];
        $this->database = $config['database'];
    }

    /**
     * Establishes a connection to the database.
     *
     * @return \PDO The database connection.
     * @throws \Exception If there is an error connecting to the database.
     */
    public function getConnection()
    {
        try {
            $connection = new \PDO('mysql:host=' . $this->host . ';dbname=' . $this->database, $this->user, $this->password);
            $connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            return $connection;
        } catch (\PDOException $e) {
            throw new \Exception('Connection error: ' . $e->getMessage());
        }
    }
}
