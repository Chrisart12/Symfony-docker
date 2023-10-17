<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class UserController extends AbstractController
{
    #[Route('/users/profile', name: 'app_user_profile')]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function profile(): Response
    {
        return $this->render('user/profile.html.twig');
    }
}