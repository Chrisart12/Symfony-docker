<?php

namespace App\Service;

use App\Entity\Project;
use App\Entity\User;
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

    public function getProjectsByUser(User $user): array
    {
        $projects = [];

        foreach ($user->getProjects() as $project) {
            $projects[] = [
                'id' => $project->getId(),
                'name' => $project->getName(),
                'key' => $project->getKey(),
                'lead' => (string) $project->getLead(),
            ];
        }

        return $projects;
    }

    public function getIssuesByProject(?Project $project): array
    {
        $issues = [];

        if (null === $project) {
            return [];
        }

        foreach ($project->getIssues() as $issue) {
            $issues[] = [
                'id' => $issue->getId(),
                'summary' => $issue->getSummary(),
            ];
        }

        return $issues;
    }

    public function remove(Project $project): void
    {
        $this->projectRepo->remove($project);
    }
}