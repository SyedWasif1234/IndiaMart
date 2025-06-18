<?php
require_once __DIR__ . '/../controllers/product.controller.php';
require_once __DIR__ . '/../middlewares/auth.middleware.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = '/Replica-of-IndiaMart/Backend/src/index.php/products';
$route = trim(str_replace($basePath, '', $uri), '/');
$parts = explode('/', $route);

// Public routes
if ($method === 'GET' && $route === '') {
    ProductController::getAll();
} elseif ($method === 'GET' && isset($parts[0])) {
    ProductController::getById($parts[0]);
} else {
    // Protected routes
    authMiddleware();

    switch ($method) {
        case 'POST':
            ProductController::create(json_decode(file_get_contents("php://input"), true));
            break;

        case 'PUT':
            if (isset($parts[0])) {
                ProductController::update($parts[0], json_decode(file_get_contents("php://input"), true));
            } else {
                http_response_code(400);
                echo json_encode(['message' => 'Product ID required']);
            }
            break;

        case 'DELETE':
            if (isset($parts[0])) {
                ProductController::delete($parts[0]);
            } else {
                http_response_code(400);
                echo json_encode(['message' => 'Product ID required']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['message' => 'Method Not Allowed']);
            break;
    }
}
