<?php

require_once '../vendor/autoload.php';

use DI\ContainerBuilder;
use App\Controller\UserController;

$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions(__DIR__ . '/../config/dependencies.php');
$container = $containerBuilder->build();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $bodyData = json_decode(file_get_contents('php://input'), true);

    $userController = $container->get(UserController::class);

    $result = $userController->createUser($bodyData);
    echo $result;
}
