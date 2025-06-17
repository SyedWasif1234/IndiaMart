<?php
require_once __DIR__ . '/../controllers/auth.controller.php';
require_once __DIR__ . '/../middlewares/auth.middleware.php'; 

// Get method and URI
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Adjust this base path to match how your app is hosted
$basePath = '/Replica-of-IndiaMart/Backend/src/index.php/auth';
$route = str_replace($basePath, '', $uri);
$route = trim($route, '/');

// Combine method and route for matching
$match = "$method /$route";

// Route handling
switch ($match) {
    case 'POST /register':
        $data = json_decode(file_get_contents("php://input"), true);
        AuthController::register($data);
        break;

    case 'POST /login':
        $data = json_decode(file_get_contents("php://input"), true);
        AuthController::login($data);
        break;

    case 'GET /me':
          authMiddleware();  // Call before the controller
          AuthController::me();
        break;

    default:
        http_response_code(404);
        echo json_encode(["message" => "Auth Route not found"]);
        break;
}
