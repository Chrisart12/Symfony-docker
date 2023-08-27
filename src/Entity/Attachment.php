<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AttachmentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AttachmentRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
class Attachment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['attachment:read', 'issue:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'attachments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Issue $issue;

    #[ORM\Column(length: 255)]
    #[Groups(['attachment:read', 'issue:read'])]
    private ?string $originalName = null;

    #[ORM\Column]
    #[Groups(['attachment:read', 'issue:read'])]
    private ?\DateTimeImmutable $createdAt;

    #[ORM\Column]
    #[Groups(['attachment:read', 'issue:read'])]
    private ?int $size = null;

    #[ORM\Column(length: 255)]
    #[Groups(['attachment:read', 'issue:read'])]
    private ?string $path = null;

    public function __construct(Issue $issue, array $args = [])
    {
        $this->issue = $issue;
        $this->createdAt = new \DateTimeImmutable();

        if ([] !== $args) {
            $this->setId($args['id']);
            $this->setOriginalName($args['originalName']);
            $this->setSize($args['size']);
            $this->setPath($args['path']);
        }
    }

    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIssue(): ?Issue
    {
        return $this->issue;
    }

    public function setIssue(?Issue $issue): static
    {
        $this->issue = $issue;

        return $this;
    }

    public function getOriginalName(): ?string
    {
        return $this->originalName;
    }

    public function setOriginalName(string $originalName): static
    {
        $this->originalName = $originalName;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(int $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path): static
    {
        $this->path = $path;

        return $this;
    }
}
