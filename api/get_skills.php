<?php


require_once '../vendor/autoload.php';

use App\Services\SkillService;
use App\Controller\SkillController;

// api -> controller -> service -> repository -> database/curl
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $skillService = new SkillService();
    $skillController = new SkillController($skillService);

    echo $skillController->getAllSkills();
}
