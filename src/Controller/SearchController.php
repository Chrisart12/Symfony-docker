<?php

namespace App\Controller;

use App\Service\IssueService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    #[Route('/search', 'search_index', methods: ['GET'])]
    public function index(Request $request, IssueService $issueService): Response
    {
        $query = $request->query->get('query');

        if ($issue = $issueService->findOneById($query)) {
            return $this->redirectToRoute('issue_show', ['id' => $issue->getId()]);
        }

        return $this->json([]);
    }
}