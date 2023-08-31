<?php

namespace App\Twig\Component;

use App\Entity\Attachment;
use App\Entity\Issue as IssueEntity;
use App\Service\AttachmentService;
use App\Service\IssueService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\Attribute\LiveListener;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentToolsTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ValidatableComponentTrait;

#[AsLiveComponent]
class Issue
{
    use ComponentToolsTrait;
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    /** @var Attachment[]  */
    #[LiveProp]
    public array $attachments;

    #[LiveProp(writable: ['description', 'summary'])]
    #[Assert\Valid]
    public IssueEntity $issue;

    #[LiveProp]
    public bool $isEditingDescription = false;

    #[LiveProp]
    public bool $isEditingSummary = false;

    #[LiveAction]
    public function activateEditingDescription(): void
    {
        $this->isEditingDescription = true;
    }

    #[LiveAction]
    public function activateEditingSummary(): void
    {
        $this->isEditingSummary = true;
    }

    #[LiveAction]
    public function addAttachment(AttachmentService $attachmentService, Request $request): void
    {
        $attachment = $attachmentService->handleUploadedFile($this->issue, $request);

        if (null === $attachment) {
            return;
        }

        $this->attachments[] = $attachment;
    }

    #[LiveAction]
    public function deactivateEditingDescription(): void
    {
        $this->isEditingDescription = false;

        $this->dispatchBrowserEvent('description:updated');
    }

    #[LiveAction]
    public function deleteAttachment(#[LiveArg] int $attachmentId, EntityManagerInterface $em): void
    {
        $attachmentToDelete = null;
        $updatedAttachments = [];

        foreach ($this->attachments as $attachment) {
            if ($attachment->getId() === $attachmentId) {
                $attachmentToDelete = $attachment;
            } else {
                $updatedAttachments[] = $attachment;
            }
        }

        $this->attachments = $updatedAttachments;
        $this->issue->removeAttachment($attachmentToDelete);

        $em->flush();
    }

    #[LiveAction]
    public function saveDescription(EntityManagerInterface $em): void
    {
        $this->validate();

        $description = nl2br(htmlentities($this->issue->getDescription(), ENT_QUOTES, 'UTF-8'));

        $this->issue->setDescription($description);

        $this->isEditingDescription = false;

        $em->flush();
    }

    #[LiveAction]
    public function saveSummary(EntityManagerInterface $em): void
    {
        $this->validate();

        $this->isEditingSummary = false;

        $em->flush();
    }

    #[LiveListener('setSelectedIssue')]
    public function setSelectedIssue(#[LiveArg] string $id, IssueService $issueService): void
    {
        $issue = $issueService->findOneById($id);

        $this->issue = $issue;

        $this->attachments = $issue->getAttachments()->toArray();
    }
}
