<?php

namespace App\Twig;

use App\Entity\Issue as IssueEntity;
use App\Enum\IssueTypeEnum;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ValidatableComponentTrait;

#[AsLiveComponent(template: 'components/select_issue_type.html.twig')]
class SelectIssueType
{
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    #[LiveProp(writable: true)]
    #[Assert\Valid]
    public IssueEntity $issue;

    #[LiveProp]
    public array $types = [];

    #[LiveProp(writable: true)]
    public IssueTypeEnum $type;

    #[LiveAction]
    public function updateType(EntityManagerInterface $em): void
    {
        $this->validate();

        $this->issue->setType($this->type);

        $em->flush();
    }
}