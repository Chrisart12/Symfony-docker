<?php

namespace App\Form\Model;

use App\Entity\User;

class ProfileModel
{
    public string $email;

    public string $firstName;

    public string $lastName;

    public function __construct(User $user)
    {
        $this->email = $user->getEmail();
        $this->firstName = $user->getFirstName();
        $this->lastName = $user->getLastName();
    }
}