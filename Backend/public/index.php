<?php

require_once __DIR__ . '/../core/Request.php';
require_once __DIR__ . '/../core/Router.php';
require_once __DIR__ . '/../src/controllers/HomeController.php';
require_once __DIR__ . '/../routes.php';

use Core\Router;
use Core\Request;

$request = new Request();
$router = new Router($request);

// Load routes
loadRoutes($router);

// Resolve current request
$router->resolve();
