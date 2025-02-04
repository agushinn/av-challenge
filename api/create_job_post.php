<?php

require_once '../vendor/autoload.php';

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods:  POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

use App\Services\JobService;
use App\Controller\JobController;

$jobService = new JobService();
$jobController = new JobController($jobService);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // api -> controller -> service -> repository -> database/curl

    $bodyData = json_decode(file_get_contents('php://input'), true);

    $result = $jobController->createJobPost(
        $bodyData
    );
    echo $result;
}
