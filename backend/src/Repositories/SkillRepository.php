<?php

namespace App\Repositories;

use App\Database\Database;

/**
 * Class SkillRepository
 *
 * This repository handles the database interactions for skills.
 *
 * @package App\Repositories
 */
class SkillRepository
{
    private $connection;

    public function __construct(Database $database)
    {
        $this->connection = $database->getConnection();
    }

    /**
     * Retrieves all skills from the database.
     *
     * @return array The list of all skills.
     */
    public function getAllSkills()
    {
        $query = "SELECT id, name, cod FROM job_skills";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
