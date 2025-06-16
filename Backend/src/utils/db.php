<?php
$host = 'localhost';
$db   = 'indiamart';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

// Create DSN (Data Source Name)
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try {
    $pdo = new PDO($dsn, $user, $pass);
    // Enable error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Optional: show connected success
    // echo "Connected to database successfully!";
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    exit;
}
?>
