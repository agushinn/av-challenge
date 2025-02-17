<?php

namespace App\Controller;

use App\Controller\ApiController;
use App\Services\SkillService;

/**
 * Class SkillController
 *
 * This controller handles the skill-related actions.
 *
 * @package App\Controller
 */
class SkillController extends ApiController
{
    private $skillService;

    /**
     * SkillController constructor.
     *
     * @param mixed $service The skill service instance.
     */
    public function __construct(SkillService $skillService)
    {
        $this->skillService = $skillService;
    }

    /**
     * Retrieves all skills.
     *
     * @return mixed The response of the skills retrieval.
     */
    public function getAllSkills()
    {
        try {
            $result = $this->skillService->getAllSkills();
            return $this->sendResponse($result, 'Skills retrieved successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }
}
