<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Enum\IssueStatusEnum;
use App\Enum\IssueTypeEnum;
use App\Repository\IssueRepository;
use App\State\IssueProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: IssueRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(normalizationContext: ['groups' => ['issue:read']]),
        new GetCollection(normalizationContext: ['groups' => ['issue:read']]),
        new Post(
            normalizationContext: ['groups' => ['issue:read']],
            denormalizationContext: ['groups' => ['issue:write']]
        ),
        new Patch(
            normalizationContext: ['groups' => ['issue:read']],
            processor: IssueProcessor::class
        )
    ]
)]
class Issue
{
    #[ORM\Id, ORM\Column]
    #[Groups(['user:read', 'issue:read'])]
    private ?string $id = null;

    #[ORM\ManyToOne(inversedBy: 'issues')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['issue:write'])]
    private ?Project $project = null;

    #[ORM\Column]
    #[Groups(['user:read', 'issue:read', 'issue:write'])]
    private ?IssueTypeEnum $type = IssueTypeEnum::BUG;

    #[ORM\Column]
    #[Groups(['issue:read', 'issue:write'])]
    private ?IssueStatusEnum $status = IssueStatusEnum::NEW;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'issue:read', 'issue:write'])]
    #[Assert\Length(min: 3, max: 255)]
    #[Assert\NotBlank]
    private ?string $summary = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['issue:read', 'issue:write'])]
    private ?string $description = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['issue:read', 'issue:write'])]
    private ?int $storyPointEstimate = null;

    #[ORM\ManyToOne(inversedBy: 'assignedIssues')]
    #[Groups(['issue:read', 'issue:write'])]
    #[Assert\NotNull]
    private ?User $assignee = null;

    #[ORM\ManyToOne(inversedBy: 'reportedIssues')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['issue:read', 'issue:write'])]
    #[Assert\NotNull]
    private ?User $reporter = null;

    #[ORM\OneToMany(mappedBy: 'issue', targetEntity: Attachment::class, orphanRemoval: true)]
    #[Groups(['issue:read'])]
    private Collection $attachments;

    public function __construct()
    {
        $this->attachments = new ArrayCollection();
    }

    #[ORM\PrePersist]
    public function setIdValue(): void
    {
        if ($this->project) {
            $this->id = $this->project->getKey().'-'.$this->project->getIssues()->count() + 1;
        }
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): static
    {
        $this->project = $project;

        return $this;
    }

    public function getType(): ?IssueTypeEnum
    {
        return $this->type;
    }

    public function setType(?IssueTypeEnum $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getStatus(): ?IssueStatusEnum
    {
        return $this->status;
    }

    public function setStatus(?IssueStatusEnum $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getStatusMarking(): string
    {
        return $this->status->workflowLabel();
    }

    public function setStatusMarking(string $statusMarking): self
    {
        $this->status = IssueStatusEnum::fromWorkflowLabel($statusMarking);

        return $this;
    }

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(string $summary): static
    {
        $this->summary = $summary;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getStoryPointEstimate(): ?int
    {
        return $this->storyPointEstimate;
    }

    public function setStoryPointEstimate(?int $storyPointEstimate): static
    {
        $this->storyPointEstimate = $storyPointEstimate;

        return $this;
    }

    public function getAssignee(): ?User
    {
        return $this->assignee;
    }

    public function setAssignee(?User $assignee): static
    {
        $this->assignee = $assignee;

        return $this;
    }

    public function getReporter(): ?User
    {
        return $this->reporter;
    }

    public function setReporter(?User $reporter): static
    {
        $this->reporter = $reporter;

        return $this;
    }

    /**
     * @return Collection<int, Attachment>
     */
    public function getAttachments(): Collection
    {
        return $this->attachments;
    }

    public function addAttachment(Attachment $attachment): static
    {
        if (!$this->attachments->contains($attachment)) {
            $this->attachments->add($attachment);
            $attachment->setIssue($this);
        }

        return $this;
    }

    public function removeAttachment(Attachment $attachment): static
    {
        if ($this->attachments->removeElement($attachment)) {
            // set the owning side to null (unless already changed)
            if ($attachment->getIssue() === $this) {
                $attachment->setIssue(null);
            }
        }

        return $this;
    }
}
