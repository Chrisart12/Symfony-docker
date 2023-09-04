<?php

namespace App\Twig\Components;

use App\Entity\Issue as IssueEntity;
use App\Service\IssueService;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\Attribute\LiveListener;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent(template: 'components/issue_navigator.html.twig')]
class IssueNavigator
{
    use DefaultActionTrait;

    #[LiveProp]
    public array $issues;

    #[LiveProp]
    public array $people;

    #[LiveProp(writable: true)]
    public ?IssueEntity $selectedIssue = null;

    #[LiveProp]
    public array $statuses;

    #[LiveProp]
    public array $types;

    #[LiveAction]
    public function setSelectedIssue(#[LiveArg] string $id, IssueService $issueService): void
    {
        $issue = $issueService->findOneById($id);

        $this->selectedIssue = $issue;
    }

    #[LiveListener('issue:created')]
    public function onIssueCreated(#[LiveArg] array $issue): void
    {
        $this->issues[] = $issue;
    }
}