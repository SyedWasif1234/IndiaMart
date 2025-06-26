<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/RazorpayClient.php';
require_once __DIR__ . '/../models/payment.model.php';
require_once __DIR__ . '/../utils/config.util.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use Config\RazorpayClient;
use Models\PaymentModel;
use Razorpay\Api\Errors\SignatureVerificationError;

class PaymentController
{
    /** POST /payment/order */
    public static function createOrder(): void
    {
        header('Content-Type: application/json');

        $payload = json_decode(file_get_contents('php://input'), true);
        $amount  = (int) ($payload['amount'] ?? 0);        // paise

        if ($amount <= 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid amount']);
            return;
        }

        try {
            $api   = RazorpayClient::create();
            $order = $api->order->create([
                'amount'          => $amount,
                'currency'        => 'INR',
                'receipt'         => uniqid('rcpt_'),
                'payment_capture' => 1
            ]);

            // Persist in DB
            PaymentModel::create(
                $order['id'],
                $amount,
                'INR',
                $order['receipt']
            );

            echo json_encode([
                'success'  => true,
                'order_id' => $order['id'],
                'key_id'   => RAZORPAY_TEST_KEY_ID
            ]);
        } catch (\Throwable $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    /** POST /payment/verify */
    public static function verifyPayment(): void
    {
        header('Content-Type: application/json');

        $body = json_decode(file_get_contents('php://input'), true);

        foreach (['razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature'] as $f) {
            if (empty($body[$f])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => "Missing $f"]);
                return;
            }
        }

        try {
            RazorpayClient::create()->utility->verifyPaymentSignature([
                'razorpay_order_id'   => $body['razorpay_order_id'],
                'razorpay_payment_id' => $body['razorpay_payment_id'],
                'razorpay_signature'  => $body['razorpay_signature'],
            ]);

            // Mark as paid in DB
            PaymentModel::markPaid(
                $body['razorpay_order_id'],
                $body['razorpay_payment_id'],
                'paid'
            );

            echo json_encode(['success' => true, 'message' => 'Payment verified']);
        } catch (SignatureVerificationError $e) {
            http_response_code(400);
            echo json_encode(['success' => false,
                              'error'   => 'Signature failed: ' . $e->getMessage()]);
        } catch (\Throwable $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
