<?php

namespace App\Twig;

use App\Entity\Issue as IssueEntity;
use App\Entity\User;
use App\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ValidatableComponentTrait;
use Symfony\UX\TwigComponent\Attribute\PostMount;

#[AsLiveComponent(template: 'components/select_issue_assignee.html.twig')]
class SelectIssueAssignee
{
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    #[LiveProp(writable: true)]
    #[Assert\Valid]
    public IssueEntity $issue;

    #[LiveProp]
    public array $assignees = [];

    #[LiveProp(writable: true)]
    public ?User $assignee;

    public function __construct(private readonly UserService $userService)
    {

    }

    #[PostMount]
    public function postMount()
    {
        $this->assignees = $this->userService->findByProject($this->issue->getProject());
    }

    #[LiveAction]
    public function updateAssignee(EntityManagerInterface $em): void
    {
        $this->validate();

        $this->issue->setAssignee($this->assignee);

        $em->flush();
    }
}