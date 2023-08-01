<?php

namespace App\Form\Model;

use Symfony\Component\Validator\Constraints as Assert;

class SignupModel
{
    #[Assert\Email]
    #[Assert\NotBlank]
    public string $email;

    #[Assert\Length(min: 8)]
    public string $password;
}