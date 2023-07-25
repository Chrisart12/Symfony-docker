<?php

namespace App\Controller;

use App\Entity\Issue;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/issues', name: 'issue_')]
class IssueController extends AbstractController
{
    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(?Issue $issue): Response
    {
        return $this->render('issue/index.html.twig', [
            'issue' => $issue
        ]);
    }
}
