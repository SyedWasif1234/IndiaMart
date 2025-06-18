<?php
class CategoryModel {
    public static function getAll() {
        try {
            $pdo = getDBConnection();
            $stmt = $pdo->query("SELECT * FROM categories ORDER BY name ASC");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to fetch categories']);
            exit();
        }
    }

    public static function create($name) {
        try {
            $pdo = getDBConnection();
            $stmt = $pdo->prepare("INSERT INTO categories (name) VALUES (?)");
            $stmt->execute([$name]);
            return $pdo->lastInsertId();
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to create category']);
            exit();
        }
    }
}
?>
