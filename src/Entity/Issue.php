<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Enum\IssueStatusEnum;
use App\Enum\IssueTypeEnum;
use App\Repository\IssueRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: IssueRepository::class)]
#[ApiResource]
class Issue
{
    #[ORM\Id]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'issues')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Project $project = null;

    private IssueTypeEnum $type = IssueTypeEnum::BUG;

    private IssueStatusEnum $status = IssueStatusEnum::NEW;

    #[ORM\Column(length: 255)]
    private ?string $summary = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(nullable: true)]
    private ?int $storyPointEstimated = null;

    #[ORM\ManyToOne(inversedBy: 'issues')]
    private ?User $assignee = null;

    #[ORM\ManyToOne(inversedBy: 'reportedIssues')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $reporter = null;

    public function getId(): ?int
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

    public function setType(IssueTypeEnum $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getStatus(): ?IssueStatusEnum
    {
        return $this->status;
    }

    public function setStatus(IssueStatusEnum $status): self
    {
        $this->status = $status;

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

    public function getStoryPointEstimated(): ?int
    {
        return $this->storyPointEstimated;
    }

    public function setStoryPointEstimated(?int $storyPointEstimated): static
    {
        $this->storyPointEstimated = $storyPointEstimated;

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
}
