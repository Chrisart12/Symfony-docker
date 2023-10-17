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
                    'placeholder' => 'Email address'
                ],
                'label' => 'Email address',
                'label_attr' => [
                    'placeholder' => 'Email address'
                ],
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'required' => true,
                'first_options' => [
                    'attr' => [
                        'placeholder' => 'Password',
                    ],
                    'label' => 'Password',
                ],
                'second_options' => [
                    'attr' => [
                        'placeholder' => 'Confirm password',
                    ],
                    'label' => 'Confirm password',
                ]
            ])
        ->add('submit', SubmitType::class, [
            'attr' => [
                'class' => 'btn btn-lg btn-primary w-100',
            ],
            'label' => 'Create an account',
        ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => SignupModel::class,
        ]);
    }
}