<?php

namespace App\Service;

use App\Entity\Project;
use App\Entity\User;
use App\Form\Model\SignupModel;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

readonly class UserService
{
    public function __construct(
        private EntityManagerInterface      $em,
        private UserPasswordHasherInterface $passwordHasher,
        private UserRepository              $userRepo,
    ) {
    }

    public function add(SignupModel $signupModel): User
    {
        $user = new User($signupModel->email);

        $user->setPassword($this->passwordHasher->hashPassword($user, $signupModel->password));

        $this->userRepo->add($user, true);

        return $user;
    }

    public function findByQuery(string $query): array
    {
        return $this->userRepo->findByQuery($query);
    }

    public function findByProject(?Project $project)
    {
        return $this->userRepo->findByProject($project);
    }

    public function getUsersByProjectQueryBuilder(Project $project): QueryBuilder
    {
        return $this->userRepo->getUsersByProjectQueryBuilder($project);
    }

    public function setSelectedProject(User $user, Project $project): void
    {
        if ($user->getSelectedProject() === $project) {
            return;
        }

        $user->setSelectedProject($project);

        $this->em->flush();
    }
}