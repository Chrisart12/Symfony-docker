<?php

namespace App\Enum;

enum IssueTypeEnum: int
{
    case BUG = 1;
    case FEATURE = 2;
    case STORY = 3;

    case TASK = 4;
    case EPIC = 5;

    public function label(): string
    {
        return match ($this) {
            self::BUG => 'Bug',
            self::FEATURE => 'Feature',
            self::STORY => 'Story',
            self::TASK => 'Task',
            self::EPIC => 'Epic',
        };
    }
}
