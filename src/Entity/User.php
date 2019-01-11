<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ApiResource(
 *  normalizationContext={"groups"={"user_read"}}
 * )
 * @UniqueEntity(
 *  fields={"email"},
 *  message="Un utilisateur possédant cet email existe déjà !"
 * )
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user_read", "customer_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user_read", "customer_read"})
     * @Assert\NotBlank(message="L'adresse email est obligatoire !")
     * @Assert\Email(message="Vous devez fournir une adresse email valide !")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"user_read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Le mot de passe est obligatoire !")
     * @Assert\Length(min=8, minMessage="Le mot de passe doit contenir 8 caractères minimum !")
     */
    private $password;

    /**
     * @var string Password Confirmation
     * @Assert\NotBlank(message="Vous devez confirmer votre mot de passe !")
     * @Assert\EqualTo(propertyPath="password", message="Les mots de passe ne coincident pas !")
     */
    public $passwordConfirmation;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read", "customer_read"})
     * @Assert\NotBlank(message="Le prénom est obligatoire !")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read", "customer_read"})
     * @Assert\NotBlank(message="Le nom de famille est obligatoire !")
     */
    private $lastName;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Customer", mappedBy="user")
     * @Groups({"user_read"})
     */
    private $customers;

    /**
     * @Groups({"user_read"})
     *
     * @return int
     */
    public function getCustomersCount()
    {
        return count($this->customers);
    }

    /**
     * @Groups({"user_read"})
     *
     * @return int
     */
    public function getInvoicesCount()
    {
        $total = 0;

        foreach ($this->customers as $customer) {
            $total += count($customer->getInvoices());
        }

        return $total;
    }

    /**
     * @Groups({"user_read"})
     *
     * @return array
     */
    public function getTotalInvoiced(): array
    {
        $totals = [Invoice::STATUS_CANCELED => 0, Invoice::STATUS_SENT => 0, Invoice::STATUS_PAID => 0, 'global' => 0];

        foreach ($this->customers as $customer) {
            foreach ($customer->getInvoices() as $invoice) {
                $totals[$invoice->getStatus()] += $invoice->getAmount();
                $totals['global'] += $invoice->getAmount();
            }
        }

        return $totals;
    }

    public function __construct()
    {
        $this->customers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return Collection|Customer[]
     */
    public function getCustomers(): Collection
    {
        return $this->customers;
    }

    public function addCustomer(Customer $customer): self
    {
        if (!$this->customers->contains($customer)) {
            $this->customers[] = $customer;
            $customer->setUser($this);
        }

        return $this;
    }

    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->contains($customer)) {
            $this->customers->removeElement($customer);
            // set the owning side to null (unless already changed)
            if ($customer->getUser() === $this) {
                $customer->setUser(null);
            }
        }

        return $this;
    }
}
