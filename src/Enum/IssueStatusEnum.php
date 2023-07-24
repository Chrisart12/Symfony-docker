<?php

namespace App\Enum;

enum IssueStatusEnum: int
{
    case NEW = 1;
    case READY = 2;
    case IN_DEVELOPMENT = 3;
    case IN_REVIEW = 4;
    case RESOLVED = 5;
}
