<?php

namespace App\Controller;

use App\Service\IssueService;
use App\Service\SearchService;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    #[Route('/search', 'search_index', methods: ['GET'])]
    public function index(Request $request, SearchService $searchService): Response
    {
        $query = $request->query->get('query');

        return $this->render('search/dropdown_menu.html.twig', [
            'results' => $searchService->search($query),
        ]);
    }
}