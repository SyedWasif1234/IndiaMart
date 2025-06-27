<?php
/**
 * OrderController — handles request validation and delegates to OrderModel
 *
 * Endpoints handled (matching order.router.php):
 *   GET    /orders         → index()
 *   GET    /orders/{id}    → show($id)
 *   POST   /orders         → create()
 *   DELETE /orders/{id}    → delete($id)
 */

require_once __DIR__ . '/../models/order.model.php';

class OrderController
{
    /**
     * List all orders (public)
     */
    public static function index(): void
    {
        header('Content-Type: application/json');
        echo json_encode(OrderModel::all());
    }

    /**
     * Show a single order by primary key (public)
     */
    public static function show(int $id): void
    {
        header('Content-Type: application/json');
        $order = OrderModel::find($id);
        if ($order) {
            echo json_encode($order);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Order not found']);
        }
    }

    /**
     * Create a new order (protected — auth enforced in router)
     */
    public static function create(): void
    {
        header('Content-Type: application/json');

        // Accept JSON or form‑urlencoded bodies
        $payload = json_decode(file_get_contents('php://input'), true) ?? $_POST;

        // Basic required‑field validation
        $required = ['email', 'first_name', 'last_name', 'address', 'phone_no', 'pincode'];
        foreach ($required as $field) {
            if (empty($payload[$field])) {
                http_response_code(422);
                echo json_encode(['message' => "$field is required"]);
                return;
            }
        }

        $id = OrderModel::create($payload);
         $order = OrderModel::getById($id);

        if ($id !== false) {
            http_response_code(201);
            echo json_encode(['message' => 'Order created successfully', 'order' => $order]);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to create order']);
        }
    }

    /**
     * Delete an order by ID (protected)
     */
    public static function delete(int $id): void
    {
        header('Content-Type: application/json');
        if (OrderModel::delete($id)) {
            echo json_encode(['message' => 'Order deleted']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Order not found']);
        }
    }
}
