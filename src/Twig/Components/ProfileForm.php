<?php

namespace App\Twig\Components;

use App\Entity\User;
use App\Form\Type\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\ComponentToolsTrait;
use Symfony\UX\LiveComponent\ComponentWithFormTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ValidatableComponentTrait;

/**
 * @method User getUser()
 */
#[AsLiveComponent]
class ProfileForm extends AbstractController
{
    use ComponentToolsTrait;
    use ComponentWithFormTrait;
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    public ?User $user = null;

    protected function instantiateForm(): FormInterface
    {
        $user =  $this->user ?: $this->getUser();

        return $this->createForm(UserType::class, $user);
    }

    #[LiveAction]
    public function save(EntityManagerInterface $em): void
    {
        $this->validate();
        $this->submitForm();

        /** @var User $user */
        $user = $this->getForm()->getData();

        $em->flush($user);
    }
}