<?php

namespace App\Services;

use App\Services\JobService;
use App\Services\JobExternalService;
use App\Strategy\StrategyInterspersed;
use App\Strategy\StrategyOrderly;

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

    public function __construct(
        JobService $jobService,
        JobExternalService $jobExternalService
    ) {
        $this->jobService = $jobService;
        $this->jobExternalService = $jobExternalService;
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
            $jobPosts = $this->jobService->getAllJobPosts($filters);
            if (!count($jobPosts) > 0 && !is_array($jobPosts)) {
                throw new \Exception('Error retrieving internal job posts.');
            }
        } catch (\Exception $e) {
            // Log the error or handle 
        }

        if (isset($filters['include_external']) && $filters['include_external'] === true) {
            try {
                $externalJobPosts = $this->jobExternalService->getAllJobPosts($filters);
                if (!count($externalJobPosts) > 0 && !is_array($externalJobPosts)) {
                    throw new \Exception('Error retrieving external job posts.');
                }
            } catch (\Exception $e) {
                // Log the error or handle 
            }
        }


        // $strategy = new StrategyInterspersed();
        $strategy = new StrategyOrderly();
        $sortedArray =  $strategy->sort($jobPosts, $externalJobPosts);
        return $sortedArray;
    }
}
