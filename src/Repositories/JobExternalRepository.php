<?php

namespace App\Repositories;

use App\Interfaces\JobRepositoryInterface;

/**
 * Class JobExternalRepository
 *
 * This repository handles the interactions with the external job postings API.
 *
 * @package App\Repositories
 */
class JobExternalRepository implements JobRepositoryInterface
{
    private $apiUrl;
    const API_URL = "http://localhost:8080";

    public function __construct()
    {
        $this->apiUrl = self::API_URL;
    }

    /**
     * Retrieves all job posts from the external API based on the provided query parameters.
     *
     * @param array $queryParams The query parameters to filter the job posts.
     * @return array The list of job posts retrieved from the external API.
     */
    public function getAllJobPosts($queryParams = [])
    {
        $url = $this->apiUrl . '/jobs';

        if (isset($queryParams)) {
            $url .= '?' . http_build_query($queryParams);
        }

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPGET, true);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if ($httpCode !== 200 || $response === false) {
            return [];
        }

        $data = json_decode($response, true);

        $formattedResponse = $this->restructureData($data);

        return $formattedResponse;
    }

    /**
     * Restructures the data retrieved from the external API.
     *
     * @param array $data The data retrieved from the external API.
     * @return array The restructured data.
     */
    private function restructureData($data)
    {
        $formattedResponse = [];
        $counter = 0;
        foreach ($data as $country => $innerArray) {
            foreach ($innerArray as $k => $v) {
                $reestructured = [];
                $reestructured['id'] = 'external_' . ++$counter;
                $reestructured['title'] = $v[0];
                $reestructured['salary'] = $v[1];
                $reestructured['description'] = '';
                $reestructured['location'] = $country;
                $reestructured['skills'] = $this->convertXmlToArray($v[2]);

                $formattedResponse[] = $reestructured;
            }
        }
        return $formattedResponse;
    }

    /**
     * Converts an XML string to an array.
     *
     * @param string $xmlString The XML string to convert.
     * @return array The converted array.
     */
    private function convertXmlToArray($xmlString)
    {
        $xmlObject = simplexml_load_string($xmlString);
        $array = [];
        foreach ($xmlObject as $item) {
            $array[] = (string) $item;
        }
        return $array;
    }

    public function getJobPostById($postId) {}
    public function createJobPost($title, $description, $location, $salary, $skills) {}
    public function updateJobPost($postId, $title, $description, $location, $salary) {}
    public function deleteJobPost($postId) {}
}
