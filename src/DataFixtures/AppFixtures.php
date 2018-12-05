<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for ($i = 0; $i < mt_rand(10, 20); $i++) {
            $gender = $faker->randomElement(['male', 'female']);
            $customer = new Customer;
            $customer->setFirstName($faker->firstName($gender))
                ->setLastName($faker->lastName($gender))
                ->setEmail($faker->companyEmail())
                ->setCompany($faker->company())
                ->setAvatar($this->getAvatar($gender));

            $manager->persist($customer);

            for ($j = 0; $j < mt_rand(1, 4); $j++) {
                $createdAt = $faker->dateTimeThisYear();
                $sentAt = (clone $createdAt)->modify('-' . mt_rand(0, 10) . ' days');
                $invoice = new Invoice;
                $invoice->setAmount($faker->randomFloat(2, 500, 4500))
                    ->setCustomer($customer)
                    ->setSentAt($sentAt)
                    ->setCreatedAt($createdAt)
                    ->setStatus($faker->randomElement([Invoice::STATUS_SENT, Invoice::STATUS_PAID, Invoice::STATUS_CANCELED]));

                $manager->persist($invoice);
                $manager->flush();
            }
        }
        // $product = new Product();
        // $manager->persist($product);

    }

    private function getAvatar(?string $gender = 'female'): string
    {
        $gender = $gender === 'female' ? 'women' : 'men';
        return "https://randomuser.me/api/portraits/{$gender}/" . mt_rand(1, 99) . ".jpg";
    }
}
