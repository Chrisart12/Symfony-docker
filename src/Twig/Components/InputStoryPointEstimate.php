<?php

namespace App\Twig\Components;

use App\Entity\Issue as IssueEntity;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ValidatableComponentTrait;

#[AsLiveComponent(template: 'components/input_story_point_estimate.html.twig')]
class InputStoryPointEstimate
{
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    #[LiveProp(writable: ['storyPointEstimate'])]
    #[Assert\Valid]
    public IssueEntity $issue;

    #[LiveAction]
    public function updateStoryPointEstimate(EntityManagerInterface $em): void
    {
        $this->validate();

        $em->flush();
    }
}