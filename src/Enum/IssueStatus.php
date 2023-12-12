<?php

namespace App\Enum;

enum IssueStatus: int
{
    case NEW = 1;
    case READY = 2;
    case IN_DEVELOPMENT = 3;
    case IN_REVIEW = 4;
    case RESOLVED = 5;

    public static function fromWorkflowLabel(string $workflowLabel): IssueStatus
    {
        return match ($workflowLabel) {
            'new' => self::NEW,
            'ready' => self::READY,
            'in_development' => self::IN_DEVELOPMENT,
            'in_review' => self::IN_REVIEW,
            'resolved' => self::RESOLVED,
        };
    }

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

    public function workflowLabel(): string
    {
        return match ($this) {
            self::NEW => 'new',
            self::READY => 'ready',
            self::IN_DEVELOPMENT => 'in_development',
            self::IN_REVIEW => 'in_review',
            self::RESOLVED => 'resolved',
        };
    }

    public function workflowTransition(): string
    {
        return match ($this) {
            self::NEW => 'to_new',
            self::READY => 'to_ready',
            self::IN_DEVELOPMENT => 'to_in_development',
            self::IN_REVIEW => 'to_in_review',
            self::RESOLVED => 'to_resolved',
        };
    }
}
