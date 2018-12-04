<?php

namespace App\Repository;

use App\Entity\Invoice;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Invoice|null find($id, $lockMode = null, $lockVersion = null)
 * @method Invoice|null findOneBy(array $criteria, array $orderBy = null)
 * @method Invoice[]    findAll()
 * @method Invoice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InvoiceRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Invoice::class);
    }

    public function findLastChronoNumber(): int
    {
        $data = $this->createQueryBuilder('i')
            ->select('i.chrono')
            ->orderBy('i.chrono', 'DESC')
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
