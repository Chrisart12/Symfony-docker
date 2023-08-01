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
                    'class' => 'form-field mb-4'
                ],
                'label' => 'Your email',
                'label_attr' => [
                    'class' => 'form-label'
                ],
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'required' => true,
                'first_options' => [
                    'attr' => [
                        'class' => 'form-field mb-4'
                    ],
                    'label' => 'Password',
                    'label_attr' => [
                        'class' => 'form-label'
                    ],
                ],
                'second_options' => [
                    'attr' => [
                        'class' => 'form-field mb-4'
                    ],
                    'label' => 'Confirm password',
                    'label_attr' => [
                        'class' => 'form-label'
                    ],
                ]
            ])
        ->add('submit', SubmitType::class, [
            'attr' => [
                'class' => 'btn'
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