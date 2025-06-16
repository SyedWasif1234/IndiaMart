<?php
namespace Core;

class Request {
    public function method(): string {
        return $_SERVER['REQUEST_METHOD'];
    }

    public function path(): string {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        return rtrim($uri, '/') ?: '/';
    }
}