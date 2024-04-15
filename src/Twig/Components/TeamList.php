<?php

namespace App\Twig\Components;

use App\Entity\Project;
use App\Service\UserService;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\TwigComponent\Attribute\PostMount;

#[AsLiveComponent]
class TeamList
{
    use DefaultActionTrait;

    #[LiveProp]
    public Project $project;

    #[LiveProp(writable: true)]
    public array $people;

    public function __construct(
        private readonly UserService $userService
    )
    {
    }

    #[PostMount]
    public function postMount(): void
    {
        $this->people = $this->userService->getTeamList($this->project);
    }

    #[LiveAction]
    public function removePerson(#[LiveArg] int $id): void
    {
        $user = $this->userService->findOneById($id);

        if (null === $user) {
            return;
        }

        if (!isset($this->people[$id])) {
            return;
        }

        unset($this->people[$id]);

        $this->userService->removeUserFromProject($user, $this->project);
    }
}