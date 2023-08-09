<?php

namespace App\Service;

use App\Entity\Issue;
use App\Enum\IssueStatusEnum;
use App\Enum\IssueTypeEnum;
use App\Repository\IssueRepository;

class IssueService
{
    public function __construct(
        private readonly IssueRepository $issueRepo
    )
    {
    }

    public function findOneById(string $id): ?Issue
    {
        return $this->issueRepo->findOneBy(['id' => $id]);
    }

    public function getIssueStatuses(): array
    {
        $statuses = [];

        foreach (IssueStatusEnum::cases() as $status) {
            $statuses[] = [
                'label' => $status->label(),
                'value' => $status->value,
            ];
        }

        return $statuses;
    }

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