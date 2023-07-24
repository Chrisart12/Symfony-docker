<?php

namespace App\Enum;

enum IssueTypeEnum: int
{
    case BUG = 1;
    case FEATURE = 2;
    case STORY = 3;
    case TASK = 4;
    case EPIC = 5;
}
