<?php
require_once __DIR__ . '/../models/category.model.php';

class CategoryController {
    public static function listAll() {
        $categories = CategoryModel::getAll();
        echo json_encode($categories);
    }

    public static function create($data) {
        if (!isset($data['name']) || empty(trim($data['name']))) {
            http_response_code(400);
            echo json_encode(['message' => 'Category name is required']);
            return;
        }

        $id = CategoryModel::create(trim($data['name']));
        echo json_encode([
            'message' => 'Category created',
            'id' => $id
        ]);
    }
}
?>
