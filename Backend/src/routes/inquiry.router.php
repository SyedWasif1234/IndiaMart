<?php
require_once __DIR__ . '/../controllers/inquiry.controller.php';
require_once __DIR__ . '/../middlewares/auth.middleware.php';
require_once __DIR__ . '/../middlewares/checkRole.middleware.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Adjust base path (match with how your app is hosted)
$basePath = '/Replica-of-IndiaMart/Backend/src/index.php/inquiries';
$route = trim(str_replace($basePath, '', $uri), '/');
$parts = explode('/', $route);

// Apply auth middleware for all inquiry routes
authMiddleware();

switch ($method) {
    case 'POST':
        InquiryController::sendInquiry(json_decode(file_get_contents("php://input"), true));
        break;

    case 'GET':
        InquiryController::getInquiries();
        break;

    case 'PUT':
        if (isset($parts[0], $parts[1]) && $parts[1] === 'respond') {
            InquiryController::respondInquiry($parts[0], json_decode(file_get_contents("php://input"), true));
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Inquiry route not found"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
