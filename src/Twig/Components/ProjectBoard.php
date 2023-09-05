<?php

namespace App\Twig\Components;

use App\Entity\Issue;
use App\Enum\IssueStatusEnum;
use App\Service\IssueService;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
class ProjectBoard
{
    use DefaultActionTrait;

    #[LiveProp]
    public array $nonStartedIssues = [];

    #[LiveProp]
    public array $inProgressIssues = [];

    #[LiveProp]
    public array $resolvedIssues = [];

    public function __construct(
        private readonly IssueService $issueService
    )
    {
    }

    public function mount(): void
    {
        $this->nonStartedIssues = $this->issueService->getNonStartedIssues();
        $this->inProgressIssues = $this->issueService->getInProgressIssues();
        $this->resolvedIssues = $this->issueService->getResolvedIssues();
    }
}