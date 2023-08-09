<?php

namespace App\EntityListener;

use App\Entity\Project;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Bundle\SecurityBundle\Security;

#[AsEntityListener(event: Events::prePersist, entity: Project::class)]
class ProjectEntityListener
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly Security $security
    ) {
    }

    public function prePersist(Project $project, LifecycleEventArgs $event): void
    {
        /** @var User $user */
        $user = $this->security->getUser();

        $project->setLead($user);
        $user->addProject($project);

        $this->em->persist($user);
    }
}