<?php

namespace App\Controller;

use App\Controller\ApiController;

/**
 * Class SearchController
 *
 * This controller handles the search-related actions.
 *
 * @package App\Controller
 */
class SearchController extends ApiController
{
    private $searchService;

    /**
     * SearchController constructor.
     *
     * @param mixed $service The search service instance.
     */
    public function __construct($service)
    {
        $this->searchService = $service;
    }

    /**
     * Retrieves all job posts based on the provided filters.
     *
     * @param array $request The request parameters containing filters for job posts.
     * @return string|bool The response of the job posts retrieval.
     */
    public function getAllJobs($request): string | bool
    {
        try {
            $result = $this->searchService->getAllJobs($request);
            return $this->sendResponse($result, 'Job posts retrieved successfully from SearchService', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }
}
