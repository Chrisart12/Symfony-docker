<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ProjectRepository;
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
    public function index(ProjectRepository $projectRepo): Response
    {
        return $this->render('project/index.html.twig', [
            'projects' => $this->getUser()->getProjects()
        ]);
    }
}
