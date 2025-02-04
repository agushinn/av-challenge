<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

require_once '../vendor/autoload.php';

use App\Services\JobService;
use App\Controller\JobController;


// api -> controller -> service -> repository -> database/curl
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $jobService = new JobService();
    $jobController = new JobController($jobService);

    echo $jobController->getJobPostById($_GET);
}
