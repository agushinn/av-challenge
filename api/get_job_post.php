<?php

require_once '../vendor/autoload.php';

use DI\ContainerBuilder;
use App\Controller\JobController;

$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions(__DIR__ . '/../config/dependencies.php');
$container = $containerBuilder->build();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $jobController = $container->get(JobController::class);

    echo $jobController->getJobPostById($_GET);
}
