<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CustomerRepository")
 * @ORM\HasLifecycleCallbacks
 * @ApiResource(
 *  normalizationContext={"groups"={"customer_read", "invoice_read"}}
 * )
 */
class Customer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"customer_read", "invoice_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customer_read", "invoice_read"})
     * @Assert\NotBlank(message="First name is mandatory !")
     * @Assert\Length(min=3, max=255, minMessage="First name must have at least 3 characters", maxMessage="First name can not be more than 255 characters long")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customer_read", "invoice_read"})
     * @Assert\NotBlank(message="Last name is mandatory !")
     * @Assert\Length(min=3, max=255, minMessage="Last name must have at least 3 characters", maxMessage="First name can not be more than 255 characters long")
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customer_read", "invoice_read"})
     * @Assert\Url(message="Avatar must be a valid image URL")
     */
    private $avatar;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customer_read"})
     * @Assert\NotBlank(message="Email is mandatory")
     * @Assert\Email(message="Email must be a valid email address")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customer_read"})
     */
    private $company;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"customer_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"customer_read"})
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Invoice", mappedBy="customer")
     */
    private $invoices;

    /**
     * @Groups({"customer_read"})
     *
     * @return string
     */
    public function getFullName(): string
    {
        return "{$this->firstName} {$this->lastName}";
    }

    /**
     * @Groups({"customer_read"})
     *
     * @return array
     */
    public function getTotalInvoiced(): array
    {
        $totals = [Invoice::STATUS_CANCELED => 0, Invoice::STATUS_SENT => 0, Invoice::STATUS_PAID => 0, 'global' => 0];

        foreach ($this->invoices as $invoice) {
            $totals[$invoice->getStatus()] += $invoice->getAmount();
            $totals['global'] += $invoice->getAmount();
        }

        return $totals;
    }

    /**
     * @Groups({"customer_read"})
     *
     * @return integer
     */
    public function getInvoicesCount(): int
    {
        return count($this->invoices);
    }

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }

    /**
     * @ORM\PrePersist
     */
    public function prePersist()
    {
        $this->createdAt = $this->createdAt ?? new \DateTime();
        $this->updatedAt = $this->updatedAt ?? new \DateTime();
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

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(string $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

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

    /**
     * @return Collection|Invoice[]
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->contains($invoice)) {
            $this->invoices->removeElement($invoice);
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }
}
