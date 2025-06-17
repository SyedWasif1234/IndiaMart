<?php
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/config.util.php';

function generateJWT($payload) {
    $issuedAt = time();
    $expiration = $issuedAt + JWT_EXPIRY;

    $payload['iat'] = $issuedAt;
    $payload['exp'] = $expiration;
    $payload['iss'] = JWT_ISSUER;

    return JWT::encode($payload, JWT_SECRET, 'HS256');
}

function verifyJWT($token) {
    try {
        return JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
    } catch (Exception $e) {
        return false;
    }
}
