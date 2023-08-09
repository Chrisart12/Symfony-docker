<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\ProjectRepository;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ProjectService
{
    public function __construct(
        private readonly ProjectRepository $projectRepo,
        private readonly NormalizerInterface $serializer
    ) {
    }

    public function findAllNormalized(array $groups): array
    {
        return $this->serializer->normalize($this->projectRepo->findAll(), 'json', [
            'groups' => $groups
        ]);
    }

    public function getProjectsByUserNormalized(User $user, array $groups): array
    {
        return $this->serializer->normalize($user->getProjects(), 'json', [
            'groups' => $groups
        ]);
    }
}