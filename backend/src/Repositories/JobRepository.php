<?php

namespace App\Repositories;

use App\Database\Database;
use App\Interfaces\JobRepositoryInterface;

/**
 * Class JobRepository
 *
 * This repository handles the database interactions for job posts.
 *
 * @package App\Repositories
 */
class JobRepository implements JobRepositoryInterface
{
    private $connection;

    public function __construct(Database $database)
    {
        $this->connection = $database->getConnection();
    }

    /**
     * Retrieves all job posts based on the provided filters.
     *
     * @param array $filters The filters to apply to the job posts query.
     * @return array The list of job posts.
     */
    public function getAllJobPosts($filters = [])
    {
        $query = "SELECT jp.id, jp.title, jp.description, jp.location, jp.salary, js.name as skill_name, js.cod as skill_cod 
                    FROM job_posts jp
                    INNER JOIN job_post_job_skill jpjs ON jp.id = jpjs.job_post_id
                    INNER JOIN job_skills js ON js.id = jpjs.job_skill_id";
        $conditions = [];
        $params = [];

        if (!empty($filters['title'])) {
            $conditions[] = "jp.title LIKE :title";
            $params[':title'] = '%' . $filters['title'] . '%';
        }

        if (!empty($filters['location'])) {
            $conditions[] = "jp.location LIKE :location";
            $params[':location'] = '%' . $filters['location'] . '%';
        }

        if (!empty($filters['salary_min']) && !empty($filters['salary_max'])) {
            $conditions[] = "jp.salary BETWEEN :salary_min AND :salary_max";
            $params[':salary_min'] = $filters['salary_min'];
            $params[':salary_max'] = $filters['salary_max'];
        } else if (!empty($filters['salary_min'])) {
            $conditions[] = "jp.salary >= :salary_min";
            $params[':salary_min'] = $filters['salary_min'];
        } else if (!empty($filters['salary_max'])) {
            $conditions[] = "jp.salary <= :salary_max";
            $params[':salary_max'] = $filters['salary_max'];
        }

        if (!empty($conditions)) {
            $query .= " WHERE " . implode(" AND ", $conditions);
        }

        $query .= " ORDER BY jp.id";

        $stmt = $this->connection->prepare($query);

        if (!empty($params)) {
            foreach ($params as $key => $value) {
                if (strpos($key, 'salary') !== false) {
                    $stmt->bindValue($key, $value, \PDO::PARAM_INT);
                } else {
                    $stmt->bindValue($key, $value, \PDO::PARAM_STR);
                }
            }
        }

        if (!$stmt->execute()) {
            return [];
        }

        $results = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $jobPosts = [];
        foreach ($results as $row) {
            $jobId = $row['id'];
            if (!isset($jobPosts[$jobId])) {
                $jobPosts[$jobId] = [
                    'id' => $row['id'],
                    'title' => $row['title'],
                    'description' => $row['description'],
                    'location' => $row['location'],
                    'salary' => $row['salary'],
                    'skills' => []
                ];
            }
            $jobPosts[$jobId]['skills'][] = $row['skill_name'];
        }

        return array_values($jobPosts);
    }

    /**
     * Retrieves a job post by its ID.
     *
     * @param int $postId The ID of the job post.
     * @return array The job post details.
     */
    public function getJobPostById($postId)
    {
        $query = "SELECT jp.id, jp.title, jp.description, jp.location, jp.salary, js.id as skill_id,js.name as skill_name, js.cod as skill_cod
                    FROM job_posts jp
                    INNER JOIN job_post_job_skill jpjs ON jp.id = jpjs.job_post_id
                    INNER JOIN job_skills js ON js.id = jpjs.job_skill_id
                    WHERE jp.id = :postId";
        $stmt = $this->connection->prepare($query);
        $stmt->bindValue(':postId', $postId, \PDO::PARAM_INT);

        if (!$stmt->execute()) {
            return [];
        }

        $results = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $jobPost = [];
        foreach ($results as $row) {
            $jobId = $row['id'];
            if (!isset($jobPost[$jobId])) {
                $jobPost[$jobId] = [
                    'id' => $row['id'],
                    'title' => $row['title'],
                    'description' => $row['description'],
                    'location' => $row['location'],
                    'salary' => $row['salary'],
                    'skills' => []
                ];
            }

            $jobPost[$jobId]['skills'][] = [
                'id' => $row['skill_id'],
                'cod' => $row['skill_cod'],
                'name' => $row['skill_name']
            ];
        }

        return array_values($jobPost);
    }

    /**
     * Creates a new job post in the database.
     *
     * @param string $title The title of the job post.
     * @param string $description The description of the job post.
     * @param string $location The location of the job post.
     * @param int $salary The salary of the job post.
     * @param array $skills The list of skill IDs associated with the job post.
     * @return array The result of the job post creation.
     * @throws \Exception If there is an error creating the job post.
     */
    public function createJobPost(
        $title,
        $description,
        $location,
        $salary,
        $skills
    ) {
        try {
            $this->connection->beginTransaction();

            $queryJob = "INSERT INTO job_posts (title, description, location, salary) VALUES (:title, :description, :location, :salary)";
            $stmtJob = $this->connection->prepare($queryJob);
            $stmtJob->bindValue(':title', $title, \PDO::PARAM_STR);
            $stmtJob->bindValue(':description', $description, \PDO::PARAM_STR);
            $stmtJob->bindValue(':location', $location, \PDO::PARAM_STR);
            $stmtJob->bindValue(':salary', $salary, \PDO::PARAM_INT);

            if (!$stmtJob->execute()) {
                $this->connection->rollBack();
                throw new \Exception('Failed to create job post');
            }

            $jobPostId = $this->connection->lastInsertId();
            $queryJobSkill = "INSERT INTO job_post_job_skill (job_post_id, job_skill_id) VALUES(:job_post_id, :job_skill_id)";

            foreach ($skills as $skill_id) {
                $stmtSkill = $this->connection->prepare($queryJobSkill);
                $stmtSkill->bindValue(':job_post_id', $jobPostId, \PDO::PARAM_INT);
                $stmtSkill->bindValue(':job_skill_id', $skill_id, \PDO::PARAM_INT);

                if (!$stmtSkill->execute()) {
                    $this->connection->rollBack();
                    throw new \Exception(sprintf(
                        'Failed to create new job_post_job_skill for: %s job and skills: %s',
                        $title,
                        implode(', ', $skills)
                    ));
                }
            }

            $this->connection->commit();

            return ['message' => sprintf('Job post created successfully. Fields: Title: %s / Description: %s / Location: %s / Salary: %d / Skills: %s', $title, $description, $location, $salary, implode(', ', $skills))];
        } catch (\Exception $e) {
            $this->connection->rollBack();
            throw $e;
        }
    }

    /**
     * Updates an existing job post in the database.
     *
     * @param int $postId The ID of the job post.
     * @param string $title The title of the job post.
     * @param string $description The description of the job post.
     * @param string $location The location of the job post.
     * @param int $salary The salary of the job post.
     * @param array $skills The list of skill IDs associated with the job post.
     * @return array The result of the job post update.
     * @throws \Exception If there is an error updating the job post.
     */
    public function updateJobPost(
        $postId,
        $title,
        $description,
        $location,
        $salary,
        $skills = []
    ) {
        try {
            $this->connection->beginTransaction();

            $queryJob = "UPDATE job_posts SET title=:title, description=:description, location=:location, salary=:salary WHERE id = :postId";
            $stmtJob = $this->connection->prepare($queryJob);
            $stmtJob->bindValue(':title', $title, \PDO::PARAM_STR);
            $stmtJob->bindValue(':description', $description, \PDO::PARAM_STR);
            $stmtJob->bindValue(':location', $location, \PDO::PARAM_STR);
            $stmtJob->bindValue(':salary', $salary, \PDO::PARAM_INT);
            $stmtJob->bindValue(':postId', $postId, \PDO::PARAM_INT);

            if (!$stmtJob->execute()) {
                throw new \Exception(sprintf('Failed to create update job_posts with id: %d', $postId));
            }

            $queryJobSkill = "DELETE FROM job_post_job_skill WHERE job_post_id = :postId";
            $stmtJobSkill = $this->connection->prepare($queryJobSkill);
            $stmtJobSkill->bindValue(':postId', $postId, \PDO::PARAM_INT);

            if (!$stmtJobSkill->execute()) {
                throw new \Exception(sprintf('Failed to delete job_post_job_skill with id: %d', $postId));
            }

            $queryJobSkill = "INSERT INTO job_post_job_skill (job_post_id, job_skill_id) VALUES(:job_post_id, :job_skill_id)";

            foreach ($skills as $skill_id) {
                $stmtSkill = $this->connection->prepare($queryJobSkill);
                $stmtSkill->bindValue(':job_post_id', $postId, \PDO::PARAM_INT);
                $stmtSkill->bindValue(':job_skill_id', $skill_id, \PDO::PARAM_INT);

                if (!$stmtSkill->execute()) {
                    throw new \Exception(sprintf(
                        'Failed to create new job_post_job_skill for: %s job and skills: %s',
                        $title,
                        implode(', ', $skills)
                    ));
                }
            }

            $this->connection->commit();

            return ['message' => sprintf('Job post id %d updated successfully. Title: %s / Description: %s / Location: %s / Salary: %d / skills: %s', $postId, $title, $description, $location, $salary, implode(', ', $skills))];
        } catch (\Exception $e) {
            $this->connection->rollBack();
            return json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Deletes a job post from the database.
     *
     * @param int $postId The ID of the job post.
     * @return array The result of the job post deletion.
     * @throws \Exception If there is an error deleting the job post.
     */
    public function deleteJobPost($postId)
    {
        try {
            $this->connection->beginTransaction();

            $queryJobSkill = "DELETE FROM job_post_job_skill WHERE job_post_id = :postId";
            $stmtJobSkill = $this->connection->prepare($queryJobSkill);
            $stmtJobSkill->bindValue(':postId', $postId, \PDO::PARAM_INT);

            if (!$stmtJobSkill->execute()) {
                throw new \Exception(sprintf('Failed to delete job_post_job_skill with id: %d', $postId));
            }

            $queryJob = "DELETE FROM job_posts WHERE id = :postId LIMIT 1";
            $stmtJob = $this->connection->prepare($queryJob);
            $stmtJob->bindValue(':postId', $postId, \PDO::PARAM_INT);

            if (!$stmtJob->execute()) {
                throw new \Exception(sprintf('Failed to delete job_post with id: %d', $postId));
            }

            $this->connection->commit();
            return ['message' => sprintf('Job post id %d deleted successfully', $postId)];
        } catch (\Exception $e) {
            $this->connection->rollBack();
            return ['error' => $e->getMessage()];
        }
    }
}
