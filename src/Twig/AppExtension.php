<?php

namespace App\Twig;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Mime\MimeTypes;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    public function __construct(
        private readonly Environment $env,
        private readonly ParameterBagInterface $parameters
    )
    {
    }

    public function getFilters(): array
    {
        return [
            new TwigFilter('is_image', [$this, 'isImage']),
        ];
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('live_action', [$this, 'renderLiveAction']),
        ];
    }

    public function isImage(string $filename): bool
    {
        $path = $this->parameters->get('kernel.project_dir').'/public/'.$filename;

        $mimeType = (new MimeTypes())->guessMimeType($path);

        return str_starts_with($mimeType, 'image/');
    }

    public function renderLiveAction(string $actionName, bool $prevent = false, ?int $debounce = null): string
    {
        $attributes[] = 'data-action=live#action';
        $attributes[] = sprintf('data-action-name=%s', $actionName);

        return rtrim(
            implode(' ', $attributes)
        );
    }

    private function escapeAsHtmlAttr(mixed $value): string
    {
        return (string) twig_escape_filter($this->env, $value, 'html_attr');
    }
}