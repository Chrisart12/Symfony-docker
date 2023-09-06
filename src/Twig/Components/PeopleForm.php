<?php

namespace App\Twig\Components;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
class PeopleForm
{
    use DefaultActionTrait;

    #[LiveAction]
    public function addPeople(
        #[LiveArg] array $people,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher,
        Security $security
    ): void
    {
        /** @var User $currentUser */
        $currentUser = $security->getUser();
        $project = $currentUser->getSelectedProject();

        foreach ($people as $email) {
            $user = new User($email);
            $user->setPassword($passwordHasher->hashPassword($user, 'T@skSphere'));
            $user->addProject($project);
            $user->setSelectedProject($project);
            $em->persist($user);
        }

        $em->flush();
    }
}