<?php
require_once __DIR__ . '/../utils/jwt.util.php';
require_once __DIR__ . '/../utils/db.php'; 

function authMiddleware() {
    // Check if jwt cookie exists
    if (!isset($_COOKIE['jwt'])) {
        http_response_code(401);
        echo json_encode(['message' => 'Please login']);
        exit();
    }

    $token = $_COOKIE['jwt'];

    // Decode JWT
    $decoded = verifyJWT($token);
    if (!$decoded || !isset($decoded->id)) {
        http_response_code(401);
        echo json_encode(['message' => 'Invalid or expired token']);
        exit();
    }

    $userId = $decoded->id;

    // Fetch user from database
    try {
        $pdo = getDBConnection();  // function defined in db.php
        $stmt = $pdo->prepare("SELECT id, name, email, role FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            http_response_code(401);
            echo json_encode(['message' => 'User not found']);
            exit();
        }

        // Attach user to request (common PHP approach)
        $_REQUEST['user'] = $user;

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'DB Error in auth middleware']);
        exit();
    }
}
