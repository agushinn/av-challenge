<?php

require_once '../vendor/autoload.php';

use DI\ContainerBuilder;
use App\Controller\JobController;

$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions(__DIR__ . '/../config/dependencies.php');
$container = $containerBuilder->build();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $bodyData = json_decode(file_get_contents('php://input'), true);

    $jobController = $container->get(JobController::class);

    $result = $jobController->updateJobPost($bodyData);
    echo $result;
}
