<?php

namespace App\Services;

use App\Repositories\SkillRepository;

/**
 * Class SkillService
 *
 * This service handles the business logic for skills.
 *
 * @package App\Services
 */
class SkillService
{
    private $skillRepository;

    public function __construct(SkillRepository $skillRepository)
    {
        $this->skillRepository = $skillRepository;
    }

    /**
     * Retrieves all skills.
     *
     * @return array The list of all skills.
     */
    public function getAllSkills()
    {
        return $this->skillRepository->getAllSkills();
    }
}
