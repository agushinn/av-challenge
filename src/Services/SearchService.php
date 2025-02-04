<?php

namespace App\Services;

use App\Services\JobService;
use App\Services\JobExternalService;

/**
 * Class SearchService
 *
 * This service handles the search functionality for job postings, including both internal and external sources.
 *
 * @package App\Services
 */
class SearchService
{
    private $jobService;
    private $jobExternalService;

    public function __construct()
    {
        $this->jobService = new JobService();
        $this->jobExternalService = new JobExternalService();
    }

    /**
     * Retrieves all job posts based on the provided filters, including external job posts if specified.
     *
     * @param array $filters The request parameters containing filters for job posts.
     * @return array The list of job posts, merged from internal and external sources.
     */
    public function getAllJobs($filters)
    {
        if (isset($filters['include_external'])) {
            $filters['include_external'] = filter_var($filters['include_external'], FILTER_VALIDATE_BOOLEAN);
        }

        $jobPosts = [];
        $externalJobPosts = [];

        try {
            $jobPostsResult = $this->jobService->getAllJobPosts($filters);
            if (count($jobPostsResult) > 0) {
                $jobPosts = $jobPostsResult;
            }
        } catch (\Exception $e) {
            // Log the error or handle 
        }

        if (isset($filters['include_external']) && $filters['include_external'] === true) {
            try {
                $externalJobPostsResult = $this->jobExternalService->getAllJobPosts($filters);
                if (count($externalJobPostsResult) > 0) {
                    $externalJobPosts = $externalJobPostsResult;
                }
            } catch (\Exception $e) {
                // Log the error or handle 
            }
        }

        $mergedJobPosts = array_merge($jobPosts, $externalJobPosts);
        return $mergedJobPosts;
    }
}
