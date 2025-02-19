<?php

require_once '../vendor/autoload.php';

use DI\ContainerBuilder;
use App\Controller\SkillController;

$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions(__DIR__ . '/../config/dependencies.php');
$container = $containerBuilder->build();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $skillController = $container->get(SkillController::class);

    echo $skillController->getAllSkills();
}
