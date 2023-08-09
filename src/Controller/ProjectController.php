<?php

namespace App\Controller;

use App\Entity\Project;
use App\Entity\User;
use App\Form\Type\ProjectType;
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
        $form = $this->createForm(ProjectType::class, new Project());

        return $this->render('project/index.html.twig', [
            'form' => $form->createView(),
            'projects' => $this->getUser()->getProjects()
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
