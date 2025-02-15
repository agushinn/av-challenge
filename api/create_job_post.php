<?php

require_once '../vendor/autoload.php';

use DI\ContainerBuilder;
use App\Controller\JobController;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions(__DIR__ . '/../config/dependencies.php');
$container = $containerBuilder->build();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $bodyData = json_decode(file_get_contents('php://input'), true);

    $jobController = $container->get(JobController::class);

    $result = $jobController->createJobPost($bodyData);
    echo $result;
}
