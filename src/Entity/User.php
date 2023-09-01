<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\UserRepository;
use App\State\UserProvider;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new Get(
            uriTemplate: '/users/me',
            normalizationContext: ['groups' => ['user:read']],
            name: 'me',
            provider: UserProvider::class
        ),
    ]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['issue:read', 'project:people:read', 'user:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['issue:read', 'issue:write', 'project:read', 'user:read'])]
    private ?string $email;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['issue:read', 'project:people:read', 'project:read', 'user:read'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['issue:read', 'project:people:read', 'project:read', 'user:read'])]
    private ?string $lastName = null;

    #[ORM\Column]
    private array $roles = [];

    #[ORM\Column]
    private ?string $password = null;

    #[ORM\OneToMany(mappedBy: 'assignee', targetEntity: Issue::class)]
    #[Groups(['user:read'])]
    private Collection $assignedIssues;

    #[ORM\OneToMany(mappedBy: 'reporter', targetEntity: Issue::class, orphanRemoval: true)]
    #[Groups(['user:read'])]
    private Collection $reportedIssues;

    #[ORM\OneToMany(mappedBy: 'lead', targetEntity: Project::class)]
    private Collection $leadedProjects;

    #[ORM\ManyToMany(targetEntity: Project::class, mappedBy: 'people')]
    #[Groups(['user:read'])]
    private Collection $projects;

    #[ORM\ManyToOne]
    private ?Project $selectedProject = null;


    public function __construct(string $email)
    {
        $this->email = $email;
        $this->assignedIssues = new ArrayCollection();
        $this->reportedIssues = new ArrayCollection();
        $this->leadedProjects = new ArrayCollection();
        $this->projects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Issue>
     */
    public function getAssignedIssues(): Collection
    {
        return $this->assignedIssues;
    }

    public function addIssue(Issue $issue): static
    {
        if (!$this->assignedIssues->contains($issue)) {
            $this->assignedIssues->add($issue);
            $issue->setAssignee($this);
        }

        return $this;
    }

    public function removeIssue(Issue $issue): static
    {
        if ($this->assignedIssues->removeElement($issue)) {
            // set the owning side to null (unless already changed)
            if ($issue->getAssignee() === $this) {
                $issue->setAssignee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Issue>
     */
    public function getReportedIssues(): Collection
    {
        return $this->reportedIssues;
    }

    public function addReportedIssue(Issue $reportedIssue): static
    {
        if (!$this->reportedIssues->contains($reportedIssue)) {
            $this->reportedIssues->add($reportedIssue);
            $reportedIssue->setReporter($this);
        }

        return $this;
    }

    public function removeReportedIssue(Issue $reportedIssue): static
    {
        if ($this->reportedIssues->removeElement($reportedIssue)) {
            // set the owning side to null (unless already changed)
            if ($reportedIssue->getReporter() === $this) {
                $reportedIssue->setReporter(null);
            }
        }

        return $this;
    }

    public function __toString(): string
    {
        return $this->firstName.' '.$this->lastName;
    }

    /**
     * @return Collection<int, Project>
     */
    public function getLeadedProjects(): Collection
    {
        return $this->leadedProjects;
    }

    public function addLeadedProject(Project $project): static
    {
        if (!$this->leadedProjects->contains($project)) {
            $this->leadedProjects->add($project);
            $project->setLead($this);
        }

        return $this;
    }

    public function removeLeadedProject(Project $project): static
    {
        if ($this->leadedProjects->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getLead() === $this) {
                $project->setLead(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): static
    {
        if (!$this->projects->contains($project)) {
            $this->projects->add($project);
            $project->addPerson($this);
        }

        return $this;
    }

    public function removeProject(Project $project): static
    {
        if ($this->projects->removeElement($project)) {
            $project->removePerson($this);
        }

        return $this;
    }

    public function getSelectedProject(): ?Project
    {
        return $this->selectedProject;
    }

    public function setSelectedProject(?Project $selectedProject): static
    {
        $this->selectedProject = $selectedProject;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }
}
