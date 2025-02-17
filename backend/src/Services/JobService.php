<?php

namespace App\Services;

use App\Repositories\JobRepository;
use App\Services\AlertService;
use App\Services\UserService;

/**
 * Class JobService
 *
 * This service handles the business logic for job postings.
 *
 * @package App\Services
 */
class JobService
{
    private $jobRepository;
    private $alertService;
    private $userService;

    public function __construct(
        JobRepository $jobRepository,
        AlertService $alertService,
        UserService $userService
    ) {
        $this->jobRepository = $jobRepository;
        $this->alertService = $alertService;
        $this->userService = $userService;
    }
    /**
     * Retrieves all job posts based on the provided filters.
     *
     * @param array $request The request parameters containing filters for job posts.
     * @return array The list of job posts.
     */
    public function getAllJobPosts($request)
    {
        $filters = [];

        if (isset($request['title'])) {
            $filters['title'] = htmlspecialchars($request['title']);
        }
        if (isset($request['location'])) {
            $filters['location'] = htmlspecialchars($request['location']);
        }
        if (isset($request['salary_max'])) {
            $filters['salary_max'] = filter_var($request['salary_max'], FILTER_VALIDATE_FLOAT);
        }
        if (isset($request['salary_min'])) {
            $filters['salary_min'] = filter_var($request['salary_min'], FILTER_VALIDATE_FLOAT);
        }

        return $this->jobRepository->getAllJobPosts($filters);
    }

    /**
     * Retrieves a job post by its ID.
     *
     * @param array $request The request parameters containing the job post ID.
     * @return array The job post details.
     * @throws \Exception If the ID is not provided or invalid.
     */
    public function getJobPostById($request)
    {
        $id = filter_var($request['id'], FILTER_VALIDATE_INT);

        if (empty($id)) {
            throw new \Exception('Id is required');
        }

        return $this->jobRepository->getJobPostById($id);
    }

    /**
     * Creates a new job post.
     *
     * @param array $request The request parameters containing job post details.
     * @return array The result of the job post creation.
     * @throws \Exception If any required parameter is missing or invalid.
     */
    public function createJobPost($request)
    {
        $title = htmlspecialchars($request['title']);
        $description = htmlspecialchars($request['description']);
        $location = htmlspecialchars($request['location']);
        $salary = filter_var($request['salary'], FILTER_VALIDATE_FLOAT);
        $skills = $request['skills'];

        if (empty($title) || !is_string($title)) {
            throw new \Exception('Title is required and must be a string');
        }

        if (empty($description) || !is_string($description)) {
            throw new \Exception('Description is required and must be a string');
        }

        if (empty($location) || !is_string($location)) {
            throw new \Exception('Location is required and must be a string');
        }

        if (empty($salary) || is_nan($salary)) {
            throw new \Exception('Salary is required and must be a number');
        }

        if (!is_array($skills) || empty($skills)) {
            throw new \Exception('Skills must be a non-empty array');
        }

        foreach ($skills as $skill) {
            if (!is_int($skill)) {
                throw new \Exception('Each skill must be an integer (skill ID)');
            }
        }

        $result = $this->jobRepository->createJobPost($title, $description, $location, $salary, $skills);

        //? Send job alert emails
        //? $emails = $this->userService->getAllUsersSuscribedToNewsletter();
        //? $this->alertService->sendJobAlertEmails($emails, $title, $location);

        return $result;
    }

    /**
     * Updates an existing job post.
     *
     * @param array $request The request parameters containing job post details.
     * @return array The result of the job post update.
     * @throws \Exception If any required parameter is missing or invalid.
     */
    public function updateJobPost($request)
    {
        $id = filter_var($request['id'], FILTER_VALIDATE_INT);
        $title = htmlspecialchars($request['title']);
        $description = htmlspecialchars($request['description']);
        $location = htmlspecialchars($request['location']);
        $salary = filter_var($request['salary'], FILTER_VALIDATE_FLOAT);
        $skills = $request['skills'];

        if (empty($id) || is_nan($id)) {
            throw new \Exception('Id is required and must be a number');
        }

        if (empty($title) || !is_string($title)) {
            throw new \Exception('Title is required and must be a string');
        }

        if (empty($description) || !is_string($description)) {
            throw new \Exception('Description is required and must be a string');
        }

        if (empty($location) || !is_string($location)) {
            throw new \Exception('Location is required and must be a string');
        }

        if (empty($salary) || is_nan($salary)) {
            throw new \Exception('Salary is required and must be a number');
        }

        if (empty($skills) || !is_array($skills)) {
            throw new \Exception('Skills are required and must be an array');
        }

        return $this->jobRepository->updateJobPost($id, $title, $description, $location, $salary, $skills);
    }

    /**
     * Deletes a job post by its ID.
     *
     * @param array $request The request parameters containing the job post ID.
     * @return array The result of the job post deletion.
     * @throws \Exception If the ID is not provided or invalid.
     */
    public function deleteJobPost($request)
    {
        $id = filter_var($request['id'], FILTER_VALIDATE_INT);

        if (empty($id) || is_nan($id)) {
            throw new \Exception('Id is required and must be a number');
        }

        return $this->jobRepository->deleteJobPost($id);
    }
}
