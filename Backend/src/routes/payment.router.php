<?php
declare(strict_types=1);

require_once __DIR__ . '/../controllers/payment.controller.php';
require_once __DIR__ . '/../middlewares/auth.middleware.php';
//  └─ add auth.middleware.php here if you want these endpoints protected
// require_once __DIR__ . '/../middlewares/auth.middleware.php';

/**
 * Grab method + trimmed path just like your auth router.
 *
 * You’ll hit these URLs as:
 *   /Replica-of-IndiaMart/Backend/src/index.php/payment/order
 *   /Replica-of-IndiaMart/Backend/src/index.php/payment/verify
 */
$method = $_SERVER['REQUEST_METHOD'];
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$basePath = '/Replica-of-IndiaMart/Backend/src/index.php/payment';
$route    = trim(str_replace($basePath, '', $uri), '/');

$match = "$method /$route";

switch ($match) {
  
    case 'POST /order':
        authMiddleware();         // uncomment if user must be logged in
        PaymentController::createOrder();   // body read inside controller
        break;

    case 'POST /verify':
        PaymentController::verifyPayment(); // body read inside controller
        break;

    default:
        http_response_code(404);
        echo json_encode(['message' => 'Payment route not found']);
        break;
}
