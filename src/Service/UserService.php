<?php

namespace App\Service;

use App\Entity\Issue;
use App\Entity\Project;
use App\Entity\User;
use App\Enum\IssueStatus;
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

    public function findOneById(int $id): ?User
    {
        return $this->userRepo->find($id);
    }

    public function findByProject(?Project $project): array
    {
        $people = [];

        foreach ($project->getPeople() as $person) {
            $people[] = [
                'value' => $person->getId(),
                'label' => (string)$person,
            ];
        }

        return $people;
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

    public function getTeamList(Project $project): array
    {
        $users = $this->userRepo->findUsersByProject($project);
        $issues = $project->getIssues();

        $teamList = [];

        foreach ($users as $user) {
            $numberOfAssignedIssues = $issues
                ->filter(fn(Issue $issue) => $issue->getAssignee() === $user && IssueStatus::IN_DEVELOPMENT === $issue->getStatus())
                ->count();

            $numberOfReportedIssues = $issues
                ->filter(fn(Issue $issue) => $issue->getReporter() === $user)
                ->count();

            $teamList[$user->getId()] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'numberOfAssignedIssues' => $numberOfAssignedIssues,
                'numberOfReportedIssues' => $numberOfReportedIssues,
            ];
        }

        return $teamList;
    }

    public function removeUserFromProject(User $user, Project $project): void
    {
        $project->removePerson($user);

        $this->em->flush();
    }
}