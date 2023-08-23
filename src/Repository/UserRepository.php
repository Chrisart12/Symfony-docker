<?php

namespace App\Repository;

use App\Entity\Project;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<User>
 * @implements PasswordUpgraderInterface<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }

    public function add(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findByQuery(string $query): array
    {
        $qb = $this
            ->createQueryBuilder('u');

        $qb
            ->select('u.id', 'u.firstName', 'u.lastName')
            ->where($qb->expr()->like('u.email', ':query'))
            ->orWhere($qb->expr()->like('u.firstName', ':query'))
            ->orWhere($qb->expr()->like('u.lastName', ':query'))
            ->setParameter('query', '%' . $query . '%');

        return $qb
            ->getQuery()
            ->getArrayResult();
    }

    public function findByProject(Project $project): array
    {
        $qb = $this
            ->createQueryBuilder('u');

        $qb
            ->select('u.id AS value', "CONCAT(u.firstName, ' ', u.lastName) AS label")
            ->where(':projectId MEMBER OF u.projects')
            ->setParameter('projectId', $project->getId());

        return $qb
            ->getQuery()
            ->getArrayResult();
    }
}
