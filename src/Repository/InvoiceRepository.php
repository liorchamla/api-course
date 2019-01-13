<?php

namespace App\Repository;

use App\Entity\Invoice;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Security\Core\Security;

/**
 * @method Invoice|null find($id, $lockMode = null, $lockVersion = null)
 * @method Invoice|null findOneBy(array $criteria, array $orderBy = null)
 * @method Invoice[]    findAll()
 * @method Invoice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InvoiceRepository extends ServiceEntityRepository
{
    private $user;

    public function __construct(RegistryInterface $registry, Security $security)
    {
        parent::__construct($registry, Invoice::class);

        $this->user = $security->getUser();
    }

    public function findLastChronoNumber($user = null): int
    {
        $data = $this->createQueryBuilder('i')
            ->select('i.chrono')
            ->orderBy('i.chrono', 'DESC')
            ->join('i.customer', 'c')
            ->andWhere('c.user = :user')
            ->setParameter(':user', $user ?? $this->user)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

        if (null !== $data) {
            $number = substr($data['chrono'], strlen(Invoice::CHRONO_PREFIX) + 4);
            return ((int) $number) + 1;
        }

        return 1;
    }

    // /**
    //  * @return Invoice[] Returns an array of Invoice objects
    //  */
    /*
    public function findByExampleField($value)
    {
    return $this->createQueryBuilder('i')
    ->andWhere('i.exampleField = :val')
    ->setParameter('val', $value)
    ->orderBy('i.id', 'ASC')
    ->setMaxResults(10)
    ->getQuery()
    ->getResult()
    ;
    }
     */

    /*
public function findOneBySomeField($value): ?Invoice
{
return $this->createQueryBuilder('i')
->andWhere('i.exampleField = :val')
->setParameter('val', $value)
->getQuery()
->getOneOrNullResult()
;
}
 */
}
