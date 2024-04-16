<?php

namespace App\Form\Model;

use App\Entity\User;
use Symfony\Component\Validator\Constraints as Assert;

class ProfileModel
{
    public int $id;

    #[Assert\Email]
    public ?string $email;

    #[Assert\NotBlank]
    public ?string $firstName;

    #[Assert\NotBlank]
    public ?string $lastName;

    public function __construct(User $user)
    {
        $this->id = $user->getId();
        $this->email = $user->getEmail();
        $this->firstName = $user->getFirstName();
        $this->lastName = $user->getLastName();
    }
}