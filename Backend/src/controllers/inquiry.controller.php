<?php
require_once __DIR__ . '/../models/inquiry.model.php';

class InquiryController {
    public static function sendInquiry($data) {
        $product_id = $data['product_id'] ?? null;
        $message = $data['message'] ?? null;
        $buyer_id = $_REQUEST['user']['id'] ?? null;

        if (!$product_id || !$message || !$buyer_id) {
            http_response_code(400);
            echo json_encode(["message" => "Missing required fields"]);
            return;
        }

        $inquiryId = InquiryModel::create($product_id, $buyer_id, $message);
        echo json_encode(["message" => "Inquiry sent", "inquiry_id" => $inquiryId]);
    }

    public static function getInquiries() {
         $user = $_REQUEST['user'];

    // Only seller or admin can access
        if ($user['role'] !== 'SELLER' && $user['role'] !== 'ADMIN') {
            http_response_code(403);
            echo json_encode(['message' => 'Only sellers or admins can view inquiries']);
            return;
        }

        if ($user['role'] === 'SELLER') {
            $inquiries = InquiryModel::getAllForSeller($user['id']);
        } else {
            // Admin gets all inquiries
            $inquiries = InquiryModel::getAll();
        }

        echo json_encode($inquiries);
    }

    public static function respondInquiry($id, $data) {
        $response = $data['status'] ?? null;
        if (!$response) {
            http_response_code(400);
            echo json_encode(["message" => "Status is required"]);
            return;
        }

        $updated = InquiryModel::respond($id, $response);
        if ($updated) {
            echo json_encode(["message" => "Inquiry updated"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update inquiry"]);
        }
    }
}
