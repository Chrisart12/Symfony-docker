<?php

namespace App\Form\Type;

use App\Entity\Issue;
use App\Entity\Project;
use App\Entity\User;
use App\Enum\IssueStatusEnum;
use App\Enum\IssueTypeEnum;
use App\Service\ProjectService;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EnumType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class IssueType extends AbstractType
{
    public function __construct(
        private readonly ProjectService $projectService
    )
    {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('project', EntityType::class, [
                'class' => Project::class,
            ])
            ->add('type', EnumType::class, [
                'choice_label' => fn (IssueTypeEnum $type) => $type->label(),
                'class' => IssueTypeEnum::class,
                'label' => 'Issue Type'
            ])
            ->add('status', EnumType::class, [
                'choice_label' => fn (IssueStatusEnum $status) => $status->label(),
                'class' => IssueStatusEnum::class
            ])
            ->add('summary', TextType::class)
            ->add('assignee', EntityType::class, [
                'class' => User::class,
                'placeholder' => 'Choose an assignee',
            ])
            ->add('reporter', EntityType::class, [
                'class' => User::class,
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'Create'
            ])
        ;
    }


    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Issue::class,
        ]);
    }
}