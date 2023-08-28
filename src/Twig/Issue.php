<?php

namespace App\Twig;

use App\Entity\Attachment;
use App\Entity\Issue as IssueEntity;
use App\Service\AttachmentService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ValidatableComponentTrait;

#[AsLiveComponent]
class Issue
{
    use DefaultActionTrait;
    use ValidatableComponentTrait;

    /** @var Attachment[]  */
    #[LiveProp]
    public array $attachments;

    #[LiveProp(writable: ['summary'])]
    #[Assert\Valid]
    public IssueEntity $issue;

    #[LiveProp]
    public bool $isEditingDescription = false;

    #[LiveProp]
    public bool $isEditingSummary = false;

    #[LiveAction]
    public function activateEditingDescription(): void
    {
        $this->isEditingSummary = true;
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
    public function saveSummary(EntityManagerInterface $em): void
    {
        $this->validate();

        $this->isEditingSummary = false;

        $em->flush();
    }
}