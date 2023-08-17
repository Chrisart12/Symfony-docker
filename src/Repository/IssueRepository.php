<?php

namespace App\Repository;

use App\Entity\Issue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Issue>
 *
 * @method Issue|null find($id, $lockMode = null, $lockVersion = null)
 * @method Issue|null findOneBy(array $criteria, array $orderBy = null)
 * @method Issue[]    findAll()
 * @method Issue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IssueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Issue::class);
    }

    public function findByQuery(string $query): array
    {
        $qb = $this
            ->createQueryBuilder('i');

        $qb
            ->select('i.id', 'i.summary')
            ->where($qb->expr()->like('i.id', ':query'))
            ->orWhere($qb->expr()->like('i.summary', ':query'))
            ->setParameter('query', '%'.$query .'%');

        return $qb
            ->getQuery()
            ->getArrayResult();
    }
}
