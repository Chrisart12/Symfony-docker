<?php

namespace App\Controller;

use App\Entity\Attachment;
use App\Entity\Issue;
use App\Entity\User;
use App\Form\Type\IssueType;
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

    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(UserService $userService): Response
    {
        $issues = [];

        foreach ($this->getUser()->getSelectedProject()->getIssues() as $issue) {
            $issues[] = [
                'id' => $issue->getId(),
                'summary' => $issue->getSummary(),
            ];
        }

        return $this->render('issue/index.html.twig', [
            'issues' => $issues,
            'people' => $userService->findByProject($this->getUser()->getSelectedProject()),
            'statuses' => $this->issueService->getStatuses(),
            'types' => $this->issueService->getTypes(),
            'projectId' => $this->getUser()->getSelectedProject()->getId()
        ]);
    }

    #[Route('/create', name: 'create', methods: ['GET'])]
    public function create(): Response
    {
        if (!$this->getUser()) {
            return $this->json([]);
        }

        $form = $this->createForm(IssueType::class, new Issue());

        return $this->render('issue/create.html.twig', [
            'form' => $form
        ]);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function showV2(?Issue $issue, UserService $userService): Response
    {
        if (!$issue) {
            return $this->render('issue/not_found.html.twig');
        }

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
