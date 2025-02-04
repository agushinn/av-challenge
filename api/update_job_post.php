<?php


header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods:  PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../vendor/autoload.php';

use App\Services\JobService;
use App\Controller\JobController;

$jobService = new JobService();
$jobController = new JobController($jobService);

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $bodyData = json_decode(file_get_contents('php://input'), true);
    $result = $jobController->updateJobPost($bodyData);
    echo $result;
}
