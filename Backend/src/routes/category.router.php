<?php
require_once __DIR__ . '/../controllers/category.controller.php';
require_once __DIR__ . '/../middlewares/auth.middleware.php';
require_once __DIR__ . '/../middlewares/checkRole.middleware.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = '/Replica-of-IndiaMart/Backend/src/index.php/categories';
$route = trim(str_replace($basePath, '', $uri), '/');

// GET and POST allowed
switch ($method) {
    case 'GET':
        CategoryController::listAll();
        break;

    case 'POST':
        authMiddleware();
        checkAdminRoleMiddleware(); // Only ADMIN can create categories
        CategoryController::create(json_decode(file_get_contents("php://input"), true));
        break;

    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method not allowed']);
        break;
}
?>
