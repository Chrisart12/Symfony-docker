<?php

namespace App\Twig\Components;

use App\Entity\Issue as IssueEntity;
use App\Form\Type\IssueType;
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
class IssueForm extends AbstractController
{
    use ComponentToolsTrait;
    use ComponentWithFormTrait;
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    #[LiveProp]
    public ?IssueEntity $initialFormData = null;

    protected function instantiateForm(): FormInterface
    {
        $issue = new IssueEntity();
        $issue->setProject($this->getUser()->getSelectedProject());
        $issue->setReporter($this->getUser());

        $this->initialFormData = $issue;

        return $this->createForm(IssueType::class, $this->initialFormData);
    }


    #[LiveAction]
    public function save(EntityManagerInterface $em): void
    {
        $this->validate();

        $this->submitForm();

        /** @var IssueEntity $issue */
        $issue = $this->getForm()->getData();

        $em->persist($issue);
        $em->flush();

        $this->dispatchBrowserEvent('issue:modal:close');
        $this->emit('issue:created', [
            'issue' => [
                'id' => $issue->getId(),
                'summary' => $issue->getSummary()
            ]
        ]);
    }
}