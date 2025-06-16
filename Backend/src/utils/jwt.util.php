<?php
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

require_once __DIR__ . '/../../vendor/autoload.php';

$jwt_secret = "your_secret_key";

function generateJWT($payload) {
    global $jwt_secret;
    $issuedAt = time();
    $expiration = $issuedAt + 3600; // valid for 1 hour
    $payload['iat'] = $issuedAt;
    $payload['exp'] = $expiration;
    return JWT::encode($payload, $jwt_secret, 'HS256');
}

function verifyJWT($token) {
    global $jwt_secret;
    try {
        return JWT::decode($token, new Key($jwt_secret, 'HS256'));
    } catch (Exception $e) {
        return false;
    }
}
?>
