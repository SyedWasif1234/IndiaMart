<?php
require_once __DIR__ . '/../utils/db.php';

/**
 * OrderModel — CRUD helper for the `orders` table
 *
 * Columns: id (PK), email, first_name, last_name, address, phone_no, pincode, created_at
 * Mirrors the structure of your existing ProductModel for consistency.
 */
class OrderModel {

    /**
     * Fetch all orders, newest first
     */
    public static function getAll() {
        $pdo  = getDBConnection();
        $stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Alias for compatibility with controllers using OrderModel::all()
     */
    public static function all() {
        return self::getAll();
    }

    /**
     * Find one order by primary key
     */
    public static function getById($id) {
        $pdo  = getDBConnection();
        $stmt = $pdo->prepare("SELECT * FROM orders WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Alias for controllers calling OrderModel::find($id)
     */
    public static function find($id) {
        return self::getById($id);
    }

    /**
     * Insert a new order row and return its ID
     * Expected $data keys: email, first_name, last_name, address, phone_no, pincode
     */
    public static function create($data) {
        $pdo  = getDBConnection();
        $stmt = $pdo->prepare("INSERT INTO orders (email, first_name, last_name, address, phone_no, pincode, created_at)
                               VALUES (?, ?, ?, ?, ?, ?, NOW())");
        $stmt->execute([
            $data['email'],
            $data['first_name'],
            $data['last_name'],
            $data['address'],
            $data['phone_no'],
            $data['pincode'],
            
            
        ]);
        return $pdo->lastInsertId();
    }

    /**
     * Delete an order; returns true if one row was removed
     */
    public static function delete($id) {
        $pdo  = getDBConnection();
        $stmt = $pdo->prepare("DELETE FROM orders WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
