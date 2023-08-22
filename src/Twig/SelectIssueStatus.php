<?php

namespace App\Twig;

use App\Entity\Issue as IssueEntity;
use App\Enum\IssueStatusEnum;
use App\Service\IssueService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ValidatableComponentTrait;

#[AsLiveComponent(template: 'components/select_issue_status.html.twig')]
class SelectIssueStatus
{
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    #[LiveProp(writable: true)]
    #[Assert\Valid]
    public IssueEntity $issue;

    #[LiveProp]
    public array $statuses = [];

    #[LiveProp(writable: true)]
    public IssueStatusEnum $status;

    #[LiveAction]
    public function updateStatus(EntityManagerInterface $em, IssueService $issueService): void
    {
        $this->validate();

        $this->issue->setStatus($this->status);
        $this->statuses = $issueService->getEnableStatuses($this->issue->getId());

        $em->flush();
    }
}