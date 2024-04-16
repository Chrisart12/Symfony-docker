<?php

namespace App\Service;

use App\Entity\Issue;
use App\Entity\User;
use App\Enum\IssueStatus;
use App\Enum\IssueType;
use App\Repository\IssueRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Workflow\WorkflowInterface;

class IssueService
{
    public function __construct(
        private readonly IssueRepository $issueRepo,
        private readonly Security $security,
        private readonly WorkflowInterface $issueStatusesStateMachine
    ) {
    }

    public function findOneById(string $id): ?Issue
    {
        return $this->issueRepo->findOneBy(['id' => $id]);
    }

    public function findByQuery(string $query): array
    {
        return $this->issueRepo->findByQuery($query);
    }

    public function getEnableStatuses(string $id): array
    {
        $issue = $this->findOneById($id);

        $statuses[] = [
            'label' => $issue->getStatus()->label(),
            'value' => $issue->getStatus()->value
        ];

        $enabledTransitions = $this->issueStatusesStateMachine->getEnabledTransitions($issue);

        foreach ($enabledTransitions as $transition) {
            $tos = $transition->getTos();

            if (!isset($tos[0])) {
                continue;
            }

            if ($status = IssueStatus::fromWorkflowLabel($tos[0])) {
                $statuses[] = [
                    'label' => $status->label(),
                    'value' => $status->value,
                ];
            }
        }

        usort($statuses, fn ($a, $b) => $a['value'] > $b['value'] ? 1 : -1);

        return $statuses;
    }

    public function getInProgressIssues(): array
    {
        return $this->getIssuesByStatus([IssueStatus::IN_DEVELOPMENT, IssueStatus::IN_REVIEW]);
    }

    public function getReadyIssues(): array
    {
        return $this->getIssuesByStatus([IssueStatus::READY]);
    }

    public function getResolvedIssues(): array
    {
        return $this->getIssuesByStatus([IssueStatus::RESOLVED]);
    }

    private function getIssuesByStatus(array $statuses): array
    {
        $user = $this->security->getUser();
        $issues = [];

        $issuesCollection = $user->getSelectedProject()
            ->getIssues()
            ->filter(fn(Issue $issue) => in_array($issue->getStatus(), $statuses));

        foreach ($issuesCollection as $issue) {
            $issues[] = [
                'id' => $issue->getId(),
                'summary' => $issue->getSummary(),
            ];
        }

        return $issues;
    }

    public function getStatuses(): array
    {
        $statuses = [];

        foreach (IssueStatus::cases() as $status) {
            $statuses[] = [
                'label' => $status->label(),
                'value' => $status->value,
            ];
        }

        return $statuses;
    }

    public function getTypes(): array
    {
        $types = [];


        foreach (IssueType::cases() as $type) {
            $types[] = [
                'label' => $type->label(),
                'value' => $type->value,
            ];
        }

        return $types;
    }
}