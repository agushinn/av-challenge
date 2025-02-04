<?php

namespace App\Interfaces;

/**
 * Interface JobRepositoryInterface
 *
 * This interface defines the methods that any job repository must implement.
 *
 * @package App\Interfaces
 */
interface JobRepositoryInterface
{
    /**
     * Retrieves all job posts based on the provided filters.
     *
     * @param array $filters The filters to apply to the job posts query.
     * @return array The list of job posts.
     */
    public function getAllJobPosts($filters);

    /**
     * Retrieves a job post by its ID.
     *
     * @param int $postId The ID of the job post.
     * @return array The job post details.
     */
    public function getJobPostById($postId);

    /**
     * Creates a new job post.
     *
     * @param string $title The title of the job post.
     * @param string $description The description of the job post.
     * @param string $location The location of the job post.
     * @param int $salary The salary of the job post.
     * @param array $skills The list of skill IDs associated with the job post.
     * @return array The result of the job post creation.
     */
    public function createJobPost($title, $description, $location, $salary, $skills);

    /**
     * Updates an existing job post.
     *
     * @param int $postId The ID of the job post.
     * @param string $title The title of the job post.
     * @param string $description The description of the job post.
     * @param string $location The location of the job post.
     * @param int $salary The salary of the job post.
     * @return array The result of the job post update.
     */
    public function updateJobPost($postId, $title, $description, $location, $salary);

    /**
     * Deletes a job post.
     *
     * @param int $postId The ID of the job post.
     * @return array The result of the job post deletion.
     */
    public function deleteJobPost($postId);
}
