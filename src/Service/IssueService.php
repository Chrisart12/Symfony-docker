<?php

namespace App\Service;

use App\Entity\Issue;
use App\Enum\IssueStatusEnum;
use App\Enum\IssueTypeEnum;
use App\Repository\IssueRepository;
use Symfony\Component\Workflow\WorkflowInterface;

class IssueService
{
    public function __construct(
        private readonly IssueRepository $issueRepo,
        private readonly WorkflowInterface $issueStatusesStateMachine
    )
    {
    }

    public function findOneById(string $id): ?Issue
    {
        return $this->issueRepo->findOneBy(['id' => $id]);
    }

    public function getIssueStatuses(string $id): array
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

            if ($status = IssueStatusEnum::fromWorkflowLabel($tos[0])) {
                $statuses[] = [
                    'label' => $status->label(),
                    'value' => $status->value,
                ];
            }
        }

        usort($statuses, fn ($a, $b) => $a['value'] > $b['value']);

        return $statuses;
    }

//    public function getIssueStatuses(): array
//    {
//        $statuses = [];
//
//        foreach (IssueStatusEnum::cases() as $status) {
//            $statuses[] = [
//                'label' => $status->label(),
//                'value' => $status->value,
//            ];
//        }
//
//        return $statuses;
//    }

    public function getIssueTypes(): array
    {
        $types = [];


        foreach (IssueTypeEnum::cases() as $type) {
            $types[] = [
                'label' => $type->label(),
                'value' => $type->value,
            ];
        }

        return $types;
    }
}