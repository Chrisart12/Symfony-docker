<?php

namespace App\Twig\Components;

use App\Enum\IssueStatus;
use App\Service\IssueService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\Attribute\LiveListener;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
class ProjectBoard
{
    use DefaultActionTrait;

    #[LiveProp]
    public array $readyIssues = [];

    #[LiveProp]
    public array $inProgressIssues = [];

    #[LiveProp]
    public array $resolvedIssues = [];

    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly IssueService $issueService
    ) {
    }

    public function mount(): void
    {
        $this->getIssues();
    }

    #[LiveAction]
    public function updateIssueStatus(#[LiveArg] string $id, #[LiveArg] IssueStatus $status): void
    {
        $issue = $this->issueService->findOneById($id);

        if (!$issue) {
            return;
        }

        $issue->setStatus($status);

        $this->em->flush();

        $this->getIssues();
    }

    private function getIssues(): void
    {
        $this->readyIssues = $this->issueService->getReadyIssues();
        $this->inProgressIssues = $this->issueService->getInProgressIssues();
        $this->resolvedIssues = $this->issueService->getResolvedIssues();
    }
}