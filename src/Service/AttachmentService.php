<?php

namespace App\Service;

use App\Entity\Attachment;
use App\Entity\Issue;
use App\Repository\AttachmentRepository;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;

class AttachmentService
{
    public function __construct(
        private readonly AttachmentRepository $attachmentRepo,
        private readonly SluggerInterface $slugger
    ) {
    }

    public function add(Attachment $attachment): void
    {
        $this->attachmentRepo->add($attachment, true);
    }

    public function generateNewFilename(UploadedFile $file): string
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFileName = $this->slugger->slug($originalFilename);

        return $safeFileName.'-'.uniqid().'.'.$file->guessExtension();
    }
}