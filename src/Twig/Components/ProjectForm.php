<?php

namespace App\Twig\Components;

use App\Entity\Project;
use App\Form\Type\ProjectType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentToolsTrait;
use Symfony\UX\LiveComponent\ComponentWithFormTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ValidatableComponentTrait;

#[AsLiveComponent]
class ProjectForm extends AbstractController
{
    use ComponentToolsTrait;
    use ComponentWithFormTrait;
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    #[LiveProp]
    public ?Project $initialFormData = null;

    protected function instantiateForm(): FormInterface
    {
        $project = new Project();

        $this->initialFormData = $project;

        return $this->createForm(ProjectType::class, $this->initialFormData);
    }

    #[LiveAction]
    public function save(EntityManagerInterface $em): void
    {
        $this->validate();

        $this->submitForm();

        /** @var Project $project */
        $project = $this->getForm()->getData();

        $project->setLead($this->getUser());

        $em->persist($project);
        $em->flush();

        $this->dispatchBrowserEvent('project:modal:close');
    }
}