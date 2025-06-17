<?php
function checkAdminRoleMiddleware() {
    // Check if user is attached from authMiddleware
    if (!isset($_REQUEST['user']) || $_REQUEST['user']['role'] !== 'ADMIN') {
        http_response_code(403);
        echo json_encode(['message' => 'Access denied. Admins only.']);
        exit();
    }

    // If admin, proceed
}
