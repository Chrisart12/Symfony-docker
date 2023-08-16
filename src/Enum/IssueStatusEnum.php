<?php

namespace App\Enum;

enum IssueStatusEnum: int
{
    case NEW = 0;
    case READY = 1;
    case IN_DEVELOPMENT = 2;
    case IN_REVIEW = 3;
    case RESOLVED = 4;

    public function label(): string
    {
        return match ($this) {
            self::NEW => 'New',
            self::READY => 'Ready',
            self::IN_DEVELOPMENT => 'In development',
            self::IN_REVIEW => 'In review',
            self::RESOLVED => 'Resolved',
        };
    }

    public function workflow(): string
    {
        return match ($this) {
            self::NEW => 'new',
            self::READY => 'ready',
            self::IN_DEVELOPMENT => 'in_development',
            self::IN_REVIEW => 'in_review',
            self::RESOLVED => 'resolved',
        };
    }
}
