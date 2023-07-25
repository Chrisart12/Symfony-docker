<?php

namespace App\Controller;

use App\Entity\Issue;
use App\Entity\User;
use App\Enum\IssueStatusEnum;
use App\Enum\IssueTypeEnum;
use App\Service\ProjectService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @method User getUser()
 */
#[Route('/issues', name: 'issue_')]
class IssueController extends AbstractController
{
    #[Route('/create', name: 'create', methods: ['GET'])]
    public function create(ProjectService $projectService): Response
    {
        if (!$user = $this->getUser()) {
            return $this->json([]);
        }

        $reporter = [
            'id' => $user->getId(),
            'name' => $user->getEmail(),
        ];

        $statuses = [];
        $types = [];

        foreach (IssueStatusEnum::cases() as $status) {
            $statuses[] = [
                'label' => $status->label(),
                'value' => $status->value,
            ];
        }

        foreach (IssueTypeEnum::cases() as $type) {
            $types[] = [
                'label' => $type->label(),
                'value' => $type->value,
            ];
        }

        return $this->json([
            'projects' => $projectService->findAllNormalized(['project:list:create:issue']),
            'statuses' => $statuses,
            'types' => $types,
            'reporter' => $reporter
        ]);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(?Issue $issue): Response
    {
        return $this->render('issue/index.html.twig', [
            'issue' => $issue
        ]);
    }
}
