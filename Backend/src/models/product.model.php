<?php
require_once __DIR__ . '/../utils/db.php';

class ProductModel {
    public static function getAll() {
        $pdo = getDBConnection();
        $stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getById($id) {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function create($data, $sellerId) {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("INSERT INTO products (seller_id, title, description, price, category_id, image, created_at)
                               VALUES (?, ?, ?, ?, ?, ?, NOW())");
        $stmt->execute([
            $sellerId,
            $data['title'],
            $data['description'],
            $data['price'],
            $data['category_id'],
            $data['image']
        ]);
        return $pdo->lastInsertId();
    }

    public static function update($id, $sellerId, $data) {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("UPDATE products SET title = ?, description = ?, price = ?, category_id = ?, image = ?
                               WHERE id = ? AND seller_id = ?");
        return $stmt->execute([
            $data['title'],
            $data['description'],
            $data['price'],
            $data['category_id'],
            $data['image'],
            $id,
            $sellerId
        ]);
    }

    public static function delete($id, $userId, $isAdmin = false) {
        $pdo = getDBConnection();
        if ($isAdmin) {
            $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
            return $stmt->execute([$id]);
        } else {
            $stmt = $pdo->prepare("DELETE FROM products WHERE id = ? AND seller_id = ?");
            return $stmt->execute([$id, $userId]);
        }
    }
}
