<?php

require_once '../vendor/autoload.php';


header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods:  POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
// API -> CONTROLLER -> SERVICE -> REPOSITORY -> DATABASE/CURL
use App\Services\UserService;
use App\Controller\UserController;

$userService = new UserService();
$userController = new UserController($userService);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $bodyData = json_decode(file_get_contents('php://input'), true);

    $result = $userController->createUser(
        $bodyData
    );

    echo $result;
}
