<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @method User getUser()
 */
class TeamController extends AbstractController
{
    #[Route('/team', name: 'team_index')]
    public function index(): Response
    {
        return $this->render('team/index.html.twig', [
            'project' => $this->getUser()->getSelectedProject()
        ]);
    }
}
