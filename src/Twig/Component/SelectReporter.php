<?php

namespace App\Twig\Component;

use App\Entity\Issue as IssueEntity;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ValidatableComponentTrait;

#[AsLiveComponent(template: 'components/select_reporter.html.twig')]
class SelectReporter
{
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    #[LiveProp(writable: true)]
    #[Assert\Valid]
    public IssueEntity $issue;

    #[LiveProp]
    public array $people = [];

    #[LiveProp(writable: true)]
    public ?User $reporter;

    #[LiveAction]
    public function updateReporter(EntityManagerInterface $em): void
    {
        $this->validate();

        $this->issue->setReporter($this->reporter);

        $em->flush();
    }
}