<?php

namespace App\State;

use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Issue;
use Symfony\Component\Workflow\WorkflowInterface;

class IssueProcessor implements ProcessorInterface
{
    public function __construct(
        private readonly PersistProcessor $persistProcessor,
        private readonly WorkflowInterface $issueStatusesStateMachine
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if (!$data instanceof Issue && !$operation instanceof Patch) {
            return;
        }

        /** @var Issue $previousIssue */
        $previousData = $context['previous_data'];

        if (!$this->isStatusUpdated($data, $previousData) || $this->canUpdateStatus($data, $previousData)) {
            $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        }

        return $data;
    }

    private function canUpdateStatus(Issue $issue, Issue $previousIssue): bool
    {
        return $this->issueStatusesStateMachine->can($issue, $previousIssue->getStatus()->workflowTransition());
    }

    private function isStatusUpdated(Issue $issue, Issue $previousIssue): bool
    {
        return $issue->getStatus() !== $previousIssue->getStatus();
    }
}