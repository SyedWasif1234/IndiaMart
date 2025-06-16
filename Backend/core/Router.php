<?php
namespace Core;

class Router {
    private array $routes = [];

    public function __construct(private Request $request) {}

    public function get(string $path, callable $handler): void {
        $this->routes['GET'][$path] = $handler;
    }

    public function resolve(): void {
        $method = $this->request->method();
        $path = $this->request->path();

        $handler = $this->routes[$method][$path] ?? null;

        if ($handler) {
            call_user_func($handler);
        } else {
            http_response_code(404);
            echo "404 - Page not found.";
        }
    }
}