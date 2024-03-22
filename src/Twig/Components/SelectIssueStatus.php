<?php

namespace App\Twig\Components;

use App\Entity\Issue as IssueEntity;
use App\Enum\IssueStatus;
use App\Service\IssueService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ValidatableComponentTrait;

#[AsLiveComponent]
class SelectIssueStatus
{
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    #[LiveProp(writable: true, updateFromParent: true)]
    #[Assert\Valid]
    public IssueEntity $issue;

    #[LiveProp(updateFromParent: true)]
    public array $statuses = [];

    #[LiveProp(writable: true, updateFromParent: true)]
    public IssueStatus $status;

    #[LiveAction]
    public function updateStatus(EntityManagerInterface $em, IssueService $issueService): void
    {
        $this->validate();

        $this->issue->setStatus($this->status);
        $this->statuses = $issueService->getEnableStatuses($this->issue->getId());

        $em->flush();
    }
}