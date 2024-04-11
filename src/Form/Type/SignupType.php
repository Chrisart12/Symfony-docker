<?php

namespace App\Form\Type;

use App\Form\Model\SignupModel;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SignupType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [
                'attr' => [
                    'placeholder' => 'Adresse e-mail'
                ],
                'label' => 'Adresse e-mail',
                'label_attr' => [
                    'placeholder' => 'Adresse e-mail'
                ],
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'required' => true,
                'first_options' => [
                    'attr' => [
                        'placeholder' => 'Mot de passe',
                    ],
                    'label' => 'Mot de passe',
                ],
                'second_options' => [
                    'attr' => [
                        'placeholder' => 'Confirmation du mot de passe',
                    ],
                    'label' => 'Confirmation du mot de passe',
                ]
            ])
        ->add('submit', SubmitType::class, [
            'attr' => [
                'class' => 'btn btn-lg btn-primary w-100',
            ],
            'label' => "S'inscrire",
        ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => SignupModel::class,
        ]);
    }
}