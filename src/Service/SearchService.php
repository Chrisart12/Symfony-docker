<?php

namespace App\Service;

use Symfony\Component\Routing\RouterInterface;

readonly class SearchService
{
    public function __construct(
        private IssueService    $issueService,
        private RouterInterface $router
    ) {
    }

    public function search(string $query): array
    {
        if ('' === $query) {
            return [];
        }

        $issueOptions = [];

        $issues = $this->issueService->findByQuery($query);

        foreach ($issues as $issue) {
            $issueOptions[] = [
                'label' => "[{$issue['id']}] {$issue['summary']}",
                'value' => $this->router->generate('issue_show', [
                    'id' => $issue['id']
                ]),
            ];
        }

        return [
            'issues' => $issueOptions,
        ];
    }
}