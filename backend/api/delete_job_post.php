<?php

require_once '../vendor/autoload.php';

use DI\ContainerBuilder;
use App\Controller\JobController;

$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions(__DIR__ . '/../config/dependencies.php');
$container = $containerBuilder->build();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $bodyData = json_decode(file_get_contents('php://input'), true);

    $jobController = $container->get(JobController::class);

    $result = $jobController->deleteJobPost($bodyData);
    echo $result;
}
