<?php
require_once __DIR__ . '/../utils/db.php';

class AdminController {
    public static function listUsers() {
        try {
            $pdo = getDBConnection();
            $stmt = $pdo->query("SELECT id, name, email, role FROM users");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public static function deleteUser($id) {
        try {
            $pdo = getDBConnection();
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['message' => 'User not found']);
                return;
            }

            echo json_encode(['message' => 'User deleted successfully']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public static function changeUserRole($id, $role) {
        try {
            $pdo = getDBConnection();
            $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
            $stmt->execute([$role, $id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['message' => 'User not found or role unchanged']);
                return;
            }

            echo json_encode(['message' => 'User role updated successfully']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public static function listProducts() {
        try {
            $pdo = getDBConnection();
            $stmt = $pdo->query("SELECT * FROM products");
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($products);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }
}
