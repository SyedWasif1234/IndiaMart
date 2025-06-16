<?php

require_once _DIR_ . '/../core/Request.php';
require_once _DIR_ . '/../core/Router.php';
require_once _DIR_ . '/../controllers/HomeController.php';
require_once _DIR_ . '/../routes.php';

use Core\Router;
use Core\Request;

$request = new Request();
$router = new Router($request);

// Load routes
loadRoutes($router);

// Resolve current request
$router->resolve();