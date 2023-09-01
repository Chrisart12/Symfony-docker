<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home_index')]
    public function index(): Response
    {
        return $this->redirectToRoute('home_your_work');
    }

    #[Route('/your-work', name: 'home_your_work')]
    public function yourWork(): Response
    {
        return $this->render('home/your_work.html.twig');
    }
}
