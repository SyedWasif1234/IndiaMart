<?php
require_once __DIR__ . '/../utils/db.php';

class InquiryModel {
    public static function create($product_id, $buyer_id, $message) {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("INSERT INTO inquiries (product_id, buyer_id, message, status, created_at) VALUES (?, ?, ?, 'pending', NOW())");
        $stmt->execute([$product_id, $buyer_id, $message]);
        return $pdo->lastInsertId();
    }

 public static function getAllForSeller($sellerId) {
    $pdo = getDBConnection();

    $stmt = $pdo->prepare("
        SELECT i.* 
        FROM inquiries i
        INNER JOIN products p ON i.product_id = p.id
        WHERE p.seller_id = ?
        ORDER BY i.created_at DESC
    ");

    $stmt->execute([$sellerId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


    public static function respond($id, $response) {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("UPDATE inquiries SET status = ? WHERE id = ?");
        return $stmt->execute([$response, $id]);
    }
}
