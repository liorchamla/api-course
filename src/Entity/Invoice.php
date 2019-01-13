<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InvoiceRepository")
 * @ORM\HasLifecycleCallbacks
 * @ApiResource(
 *  normalizationContext={"groups"={"invoice_read"}}
 * )
 */
class Invoice
{
    const STATUS_CREATED = 'created';
    const STATUS_SENT = 'sent';
    const STATUS_PAID = 'paid';
    const STATUS_CANCELED = 'canceled';
    const CHRONO_PREFIX = 'FA';

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"invoice_read", "customer_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoice_read", "customer_read"})
     */
    private $chrono;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoice_read", "customer_read"})
     */
    private $sentAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoice_read", "customer_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoice_read", "customer_read"})
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoice_read", "customer_read"})
     * @Assert\NotBlank(message="The amount is mandatory")
     * @Assert\Type("float", message="The amount must be a number !")
     * @Assert\Expression("this.getAmount() > 0", message="Amount must be a positive number !")
     */
    private $amount;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoice_read", "customer_read"})
     * @Assert\Choice({"sent", "paid", "canceled"}, message="The status must be 'sent', 'paid' or 'canceled'")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="invoices")
     * @Groups("invoice_read")
     */
    private $customer;

    /**
     * @ORM\PrePersist
     */
    public function prePersist(LifecycleEventArgs $event)
    {
        $this->createdAt = $this->createdAt ?? new \DateTime();
        $this->sentAt = $this->sentAt ?? new \DateTime();
        $this->updatedAt = $this->updatedAt ?? new \DateTime();

        $repository = $event->getObjectManager()->getRepository(Invoice::class);
        $chronoNumber = $repository->findLastChronoNumber($this->customer->getUser());
        $this->chrono = Invoice::CHRONO_PREFIX . (new \DateTime())->format('Y') . str_pad($chronoNumber, 3, '0', STR_PAD_LEFT);
    }

    /**
     * @ORM\PreUpdate
     */
    public function preUpdate()
    {
        $this->updatedAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChrono(): ?string
    {
        return $this->chrono;
    }

    public function setChrono(string $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }
}
