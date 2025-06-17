<?php
require_once __DIR__ . '/../utils/db.php';

class UserModel {
    public static function create($name, $email, $password, $role) {
        $pdo = getDBConnection(); 
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$name, $email, $password, $role]);
    }

   public static function findByEmail($email) {
    $pdo = getDBConnection();  // ✅ Use this instead of global $pdo

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);

    return $stmt->fetch(PDO::FETCH_ASSOC);
}


    public static function getById($id) {
        $pdo = getDBConnection(); 
        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function getAll() {
        $pdo = getDBConnection(); 
        $stmt = $pdo->query("SELECT * FROM users");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
