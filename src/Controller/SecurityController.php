<?php

namespace App\Controller;

use App\Form\Model\SignupModel;
use App\Form\Type\SignupType;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{

    #[Route('/login', name: 'security_login', methods: ['GET', 'POST'])]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        return $this->render('security/login.html.twig', [
            'error' => $authenticationUtils->getLastAuthenticationError(),
            'last_username' => $authenticationUtils->getLastUsername(),
        ]);
    }

    #[Route('/logout', name: 'security_logout', methods: ['GET'])]
    public function logout()
    {

    }

    #[Route('/signup', name: 'security_signup', methods: ['GET', 'POST'])]
    public function signup(Request $request, UserService $userService): Response
    {
        $form = $this->createForm(SignupType::class);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            /** @var SignupModel $data */
            $data = $form->getData();

            $userService->add($data);

            return $this->redirectToRoute('security_login');
        }

        return $this->render('security/signup.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
