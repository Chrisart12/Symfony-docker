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

#[AsLiveComponent]
class Issue
{
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    #[LiveProp(writable: ['summary'])]
    #[Assert\Valid]
    public IssueEntity $issue;

    #[LiveProp]
    public bool $isEditingSummary = false;

    #[LiveAction]
    public function activateEditingSummary(): void
    {
        $this->isEditingSummary = true;
    }

    #[LiveAction]
    public function saveSummary(EntityManagerInterface $em): void
    {
        $this->validate();

        $this->isEditingSummary = false;

        $em->flush();
    }
}