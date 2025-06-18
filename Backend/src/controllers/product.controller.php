<?php
require_once __DIR__ . '/../models/product.model.php';

class ProductController {
    public static function getAll() {
        $products = ProductModel::getAll();
        echo json_encode($products);
    }

    public static function getById($id) {
        $product = ProductModel::getById($id);
        if ($product) {
            echo json_encode($product);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Product not found']);
        }
    }

    public static function create($data) {
        $user = $_REQUEST['user'];

        if ($user['role'] !== 'SELLER') {
            http_response_code(403);
            echo json_encode(['message' => 'Only sellers can create products']);
            return;
        }

        $productId = ProductModel::create($data, $user['id']);
        $product = ProductModel::getById($productId); // fetch full product details

        echo json_encode([
            'message' => 'Product created',
            'product' => $product
        ]);
    }


    public static function update($id, $data) {
        $user = $_REQUEST['user'];
        $success = ProductModel::update($id, $user['id'], $data);
        if ($success) {
            echo json_encode(['message' => 'Product updated']);
        } else {
            http_response_code(403);
            echo json_encode(['message' => 'You can only update your own products']);
        }
    }

    public static function delete($id) {
        $user = $_REQUEST['user'];
        $success = ProductModel::delete($id, $user['id'], $user['role'] === 'ADMIN');
        if ($success) {
            echo json_encode(['message' => 'Product deleted']);
        } else {
            http_response_code(403);
            echo json_encode(['message' => 'Unauthorized to delete this product']);
        }
    }
}
