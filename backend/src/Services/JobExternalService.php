<?php

namespace App\Services;

use App\Repositories\JobExternalRepository;

/**
 * Class JobExternalService
 *
 * This service handles the interaction with external job postings.
 *
 * @package App\Services
 */
class JobExternalService
{
    private $jobExternalRepository;

    public function __construct(JobExternalRepository $jobExternalRepository)
    {
        $this->jobExternalRepository = new $jobExternalRepository;
    }

    /**
     * Retrieves all job posts from the external API based on the provided filters.
     *
     * @param array $request The request parameters containing filters for job posts.
     * @return array The list of job posts retrieved from the external API.
     */
    public function getAllJobPosts($request)
    {
        $queryParams = [];

        // The location must be exactly because the external API
        // filter through job.country.toLowerCase() === country.toLowerCase()
        // but the internal API return location LIKE :location
        // so string like "arg" will not match with "Argentina" in the external API
        // but it will match with "Argentina" in the internal API

        if (isset($request['location'])) {
            $queryParams['country'] = $request['location'];
        }

        if (isset($request['title'])) {
            $queryParams['name'] = $request['title'];
        }

        if (isset($request['salary_max'])) {
            $queryParams['salary_max'] = $request['salary_max'];
        }

        if (isset($request['salary_min'])) {
            $queryParams['salary_min'] = $request['salary_min'];
        }

        $result = $this->jobExternalRepository->getAllJobPosts($queryParams);

        return $result;
    }

    public function createJobPost($request) {}
    public function getJobPostById($request) {}
    public function updateJobPost($request) {}
    public function deleteJobPost($request) {}
}
