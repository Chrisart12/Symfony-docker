<?php

namespace App\Service;

use App\Entity\Project;
use App\Repository\ProjectRepository;

class ProjectService
{
    public function __construct(
        private readonly ProjectRepository $projectRepo,
    ) {
    }

    public function findOneById(int $id): ?Project
    {
        return $this->projectRepo->find($id);
    }

    public function remove(Project $project): void
    {
        foreach ($project->getPeople() as $person) {
            $person->setSelectedProject(null);
        }

        $this->projectRepo->remove($project);
    }
}