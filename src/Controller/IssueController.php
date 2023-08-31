<?php

namespace App\Controller;

use App\Entity\Attachment;
use App\Entity\Issue;
use App\Entity\User;
use App\Service\AttachmentService;
use App\Service\IssueService;
use App\Service\ProjectService;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

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
            'issueTypes' => $this->issueService->getTypes(),
            'projectId' => $this->getUser()->getSelectedProject()->getId()
        ]);
    }

    #[Route('/v2', name: 'list_v2', methods: ['GET'])]
    public function listV2(UserService $userService): Response
    {
        $issues = [];

        foreach ($this->getUser()->getSelectedProject()->getIssues() as $issue) {
            $issues[] = [
                'id' => $issue->getId(),
                'summary' => $issue->getSummary(),
            ];
        }

        return $this->render('issue/list_v2.html.twig', [
            'issues' => $issues,
            'people' => $userService->findByProject($this->getUser()->getSelectedProject()),
            'statuses' => $this->issueService->getStatuses(),
            'types' => $this->issueService->getTypes(),
            'projectId' => $this->getUser()->getSelectedProject()->getId()
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
            'projects' => $projectService->getProjectsByUserNormalized($user, ['project:list:create:issue']),
            'statuses' => $this->issueService->getStatuses(),
            'types' => $this->issueService->getTypes(),
            'reporter' => $reporter
        ]);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function showV2(Issue $issue, UserService $userService): Response
    {
        return $this->render('issue/show.html.twig', [
            'issue' => $issue,
            'people' => $userService->findByProject($issue->getProject()),
            'statuses' => $this->issueService->getEnableStatuses($issue->getId()),
            'types' => $this->issueService->getTypes()
        ]);
    }

    #[Route('/{id}/enabled-statuses', name: 'get_enabled_statuses')]
    public function getEnabledStatuses(Issue $issue): Response
    {
        return $this->json($this->issueService->getEnableStatuses($issue->getId()));
    }
}
