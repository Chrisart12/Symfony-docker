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
    public function index(ProjectService $projectService): Response
    {
        return $this->render('project/index.html.twig', [
            'projects' => $projectService->getProjectsByUser($this->getUser())
        ]);
    }

    #[Route('/{key}', name: 'show',methods: ['GET'])]
    public function show(?Project $project, UserService $userService): Response
    {
        if (null === $project) {
            return $this->redirectToRoute('project_index');
        }

        $userService->setSelectedProject($this->getUser(), $project);

        return $this->render('project/show.html.twig', [
            'project' => $project
        ]);
    }
}
