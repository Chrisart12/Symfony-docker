<?php

namespace App\Form\Type;

use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function __construct(
        private readonly Security $security
    ){
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        /** @var User $connectedUser */
        $connectedUser = $this->security->getUser();

        $disabled = false;

        /** @var User $user */
        $user = $options['data'];

        if ($user->getId() !== $connectedUser->getId()) {
            $disabled = true;
        }

        $builder
            ->add('email', EmailType::class, [
                'disabled' => $disabled,
                'label' => 'Adresse e-mail'
            ])
            ->add('firstName', TextType::class, [
                'disabled' => $disabled,
                'label' => 'Prénom'
            ])
            ->add('lastName', TextType::class, [
                'disabled' => $disabled,
                'label' => 'Nom'
            ]);

        if (!$disabled) {
            $builder->add('submit', SubmitType::class, [
                'label' => 'Enregistrer'
            ]);
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}