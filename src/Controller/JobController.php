<?php

namespace App\Controller;

use App\Controller\ApiController;

/**
 * Class JobController
 *
 * This controller handles the job-related actions.
 *
 * @package App\Controller
 */
class JobController extends ApiController
{
    private $jobService;

    /**
     * JobController constructor.
     *
     * @param mixed $service The job service instance.
     */
    public function __construct($service)
    {
        $this->jobService = $service;
    }

    /**
     * Retrieves all job posts based on the provided filters.
     *
     * @param array $request The request parameters containing filters for job posts.
     * @return string|bool The response of the job posts retrieval.
     */
    public function getAllJobPosts($request): string | bool
    {
        try {
            $result = $this->jobService->getAllJobPosts($request);
            return $this->sendResponse($result, 'Job posts retrieved successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Retrieves a job post by its ID.
     *
     * @param array $request The request parameters containing the job post ID.
     * @return string|bool The response of the job post retrieval.
     */
    public function getJobPostById($request): string | bool
    {
        try {
            $result = $this->jobService->getJobPostById($request);
            return $this->sendResponse($result, 'Job post retrieved successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Creates a new job post.
     *
     * @param array $request The request parameters containing job post details.
     * @return string|bool The response of the job post creation.
     */
    public function createJobPost($request): string | bool
    {
        try {
            $result = $this->jobService->createJobPost($request);
            return $this->sendResponse($result, 'Job post created successfully', 201);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Updates an existing job post.
     *
     * @param array $request The request parameters containing job post details.
     * @return string|bool The response of the job post update.
     */
    public function updateJobPost($request): string | bool
    {
        try {
            $result = $this->jobService->updateJobPost($request);
            return $this->sendResponse($result, 'Job post updated successfully', 201);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Deletes a job post.
     *
     * @param array $request The request parameters containing the job post ID.
     * @return string|bool The response of the job post deletion.
     */
    public function deleteJobPost($request): string | bool
    {
        try {
            $result = $this->jobService->deleteJobPost($request);
            return $this->sendResponse($result, 'Job post deleted successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }
}
