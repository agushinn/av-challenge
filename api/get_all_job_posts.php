<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../vendor/autoload.php';

use App\Services\SearchService;
use App\Controller\SearchController;


// api -> controller -> service -> repository -> database/curl
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $searchService = new SearchService();
    $searchController = new SearchController($searchService);

    echo $searchController->getAllJobs($_GET);
}
