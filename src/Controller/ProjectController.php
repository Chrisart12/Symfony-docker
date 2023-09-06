<?php

namespace App\Controller;

use App\Entity\Project;
use App\Entity\User;
use App\Service\ProjectService;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @method User getUser()
 */
#[Route('/projects', name: 'project_')]
class ProjectController extends AbstractController
{
    #[Route('/', name: 'index',methods: ['GET'])]
    public function index(): Response
    {
        $projects = [];

        foreach ($this->getUser()->getProjects() as $project) {
            $projects[] = [
                'id' => $project->getId(),
                'name' => $project->getName(),
                'key' => $project->getKey(),
                'lead' => (string) $project->getLead(),
            ];
        }

        return $this->render('project/index.html.twig', [
            'projects' => $projects
        ]);
    }

    #[Route('/{key}', name: 'show',methods: ['GET'])]
    public function show(?Project $project, UserService $userService): Response
    {
        $userService->setSelectedProject($this->getUser(), $project);

        return $this->render('project/show.html.twig', [
            'project' => $project
        ]);
    }

    #[Route('/{key}/settings', name: 'settings',methods: ['GET'])]
    public function settings(?Project $project): Response
    {
        return $this->render('project/settings.html.twig', [
            'project' => $project
        ]);
    }
}
