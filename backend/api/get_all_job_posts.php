<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once '../vendor/autoload.php';

use DI\ContainerBuilder;
use App\Controller\SearchController;

$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions(__DIR__ . '/../config/dependencies.php');
$container = $containerBuilder->build();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $searchController = $container->get(SearchController::class);

    echo $searchController->getAllJobs($_GET);
}
