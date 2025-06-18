<?php
require_once __DIR__ . '/../controllers/admin.controller.php';
require_once __DIR__ . '/../middlewares/auth.middleware.php';
require_once __DIR__ . '/../middlewares/checkRole.middleware.php';

authMiddleware(); // Ensure user is logged in
checkAdminRoleMiddleware(); // Ensure user is ADMIN

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = '/Replica-of-IndiaMart/Backend/src/index.php/admin';
$route = str_replace($basePath, '', $uri);
$route = trim($route, '/');

$parts = explode('/', $route);

// Routing
if ($method === 'GET' && $route === 'users') {
    AdminController::listUsers();
} elseif ($method === 'DELETE' && $parts[0] === 'users' && isset($parts[1])) {
    AdminController::deleteUser($parts[1]);
} elseif ($method === 'PUT' && $parts[0] === 'users' && isset($parts[1]) && isset($parts[2]) && $parts[2] === 'role') {
    $data = json_decode(file_get_contents("php://input"), true);
    $role = $data['role'] ?? null;
    if (!$role) {
        http_response_code(400);
        echo json_encode(['message' => 'Role is required']);
        exit();
    }
    AdminController::changeUserRole($parts[1], $role);
} elseif ($method === 'GET' && $route === 'products') {
    AdminController::listProducts();
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Admin Route not found']);
}
