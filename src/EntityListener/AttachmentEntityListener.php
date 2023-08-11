<?php

namespace App\EntityListener;

use App\Entity\Attachment;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

#[AsEntityListener(event: Events::postRemove, entity: Attachment::class)]
class AttachmentEntityListener
{
    public function __construct(
        private readonly ParameterBagInterface $parameters
    )
    {
    }

    public function postRemove(Attachment $attachment, LifecycleEventArgs $event): void
    {
        $filename =
            $this->parameters->get('attachments_directory').DIRECTORY_SEPARATOR.
            pathinfo($attachment->getPath(), PATHINFO_FILENAME)
            .'.'.
            pathinfo($attachment->getPath(), PATHINFO_EXTENSION);

        if(!file_exists($filename)) {
            return;
        }

        unlink($filename);
    }
}