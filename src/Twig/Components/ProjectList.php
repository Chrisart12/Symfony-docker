<?php

namespace App\Twig\Components;

use App\Service\ProjectService;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentToolsTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
class ProjectList
{
    use ComponentToolsTrait;
    use DefaultActionTrait;

    #[LiveProp]
    public array $projects;

    #[LiveAction]
    public function deleteProject(#[LiveArg] int $id, ProjectService $projectService): void
    {
        $project = $projectService->findOneById($id);

        if (!$project) {
            return;
        }

        $projectToDelete = null;

        foreach ($this->projects as $key => $value) {
            if ($value['id'] === $id) {
                $projectToDelete = $key;
                break;
            }
        }

        if (null === $projectToDelete) {
            return;
        }

        unset($this->projects[$projectToDelete]);

        $projectService->remove($project);
    }
}