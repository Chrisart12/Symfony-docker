<?php

namespace App\Service;

use App\Enum\IssueStatusEnum;
use App\Enum\IssueTypeEnum;

class IssueService
{
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