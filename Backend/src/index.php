<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get request URI and method
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove base path if running under /Replica-of-IndiaMart/backend/src
$basePath = "/Replica-of-IndiaMart/Backend/src";
$endpoint = str_replace($basePath, '', $requestUri);
$endpoint = str_replace('index.php', '', $endpoint);
$endpoint = trim($endpoint, '/'); // Clean up slashes

// ROUTING: Match based on first part of URL
switch (true) {
    case preg_match('/^auth/', $endpoint):
        require_once __DIR__ . '/routes/auth.router.php';
        break;

    case preg_match('/^products/', $endpoint):
        require_once __DIR__ . '/routes/product.router.php';
        break;

    case preg_match('/^inquiries/', $endpoint):
        require_once __DIR__ . '/routes/inquiry.router.php';
        break;

    case preg_match('/^admin/', $endpoint):
        require_once __DIR__ . '/routes/admin.router.php';
        break;

    case preg_match('/^categories/', $endpoint): // ✅ Add this
        require_once __DIR__ . '/routes/category.router.php';
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}
