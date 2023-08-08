<?php

namespace App\Controller;

use App\Entity\Issue;
use App\Entity\User;
use App\Service\IssueService;
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
    public function __construct(
        private readonly IssueService $issueService
    ) {
    }

    #[Route('/', name: 'list', methods: ['GET'])]
    public function list(): Response
    {
        return $this->render('issue/list.html.twig', [
            'issues' => $this->getUser()->getSelectedProject()->getIssues(),
            'issueStatuses' => json_encode($this->issueService->getIssueStatuses()),
            'issueTypes' => json_encode($this->issueService->getIssueTypes())
        ]);
    }

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

        return $this->json([
            'projects' => $projectService->findAllNormalized(['project:list:create:issue']),
            'statuses' => $this->issueService->getIssueStatuses(),
            'types' => $this->issueService->getIssueTypes(),
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
