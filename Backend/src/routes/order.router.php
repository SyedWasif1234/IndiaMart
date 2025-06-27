<?php
/**
 * order.router.php ─ REST-style routes for the `orders` resource
 *
 * Mirrors the structure of your existing product router so you can drop it in
 * alongside the other routes without changes to your bootstrap logic.
 *
 *   /Replica-of-IndiaMart/Backend/src/index.php/orders
 */

require_once __DIR__ . '/../controllers/order.controller.php';
require_once __DIR__ . '/../middlewares/auth.middleware.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Adjust this path if your index.php location changes
$basePath = '/Replica-of-IndiaMart/Backend/src/index.php/orders';
$route    = trim(str_replace($basePath, '', $uri), '/');
$parts    = explode('/', $route);

// ────────────────────────────────────────────────────────
// Public routes (no auth required)
// ────────────────────────────────────────────────────────
if ($method === 'GET' && $route === '') {
    // GET /orders → list all orders
    OrderController::index();

} elseif ($method === 'GET' && isset($parts[0])) {
    // GET /orders/{id} → show single order
    OrderController::show($parts[0]);

} else {
    // ────────────────────────────────────────────────────
    // Protected routes (requires auth)
    // ────────────────────────────────────────────────────
    authMiddleware();

    switch ($method) {
        case 'POST':
            // POST /orders → create new order (body handled in controller)
            OrderController::create();
            break;

        case 'DELETE':
            // DELETE /orders/{id}
            if (isset($parts[0])) {
                OrderController::delete($parts[0]);
            } else {
                http_response_code(400);
                echo json_encode(['message' => 'Order ID required']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['message' => 'Method Not Allowed']);
            break;
    }
}
