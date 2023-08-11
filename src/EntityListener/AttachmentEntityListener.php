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
        $filename = pathinfo($attachment->getPath(), PATHINFO_FILENAME);
        $extension = pathinfo($attachment->getPath(), PATHINFO_EXTENSION);
        unlink($this->parameters->get('attachments_directory').DIRECTORY_SEPARATOR.$filename.'.'.$extension);
    }
}