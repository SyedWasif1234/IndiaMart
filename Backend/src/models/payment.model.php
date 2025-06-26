<?php
declare(strict_types=1);

namespace Models;

require_once __DIR__ . '/../utils/db.php';

use PDO;

final class PaymentModel
{
    /** Insert a brand-new “created” payment row */
    public static function create(
        string $orderId,
        int    $amount,
        string $currency = 'INR',
        ?string $receipt = null
    ): bool {
        $pdo = getDBConnection();
        $sql = "INSERT INTO payments
                   (order_id, amount, currency, receipt)
                VALUES
                   (:order_id, :amount, :currency, :receipt)";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([
            ':order_id' => $orderId,
            ':amount'   => $amount,
            ':currency' => $currency,
            ':receipt'  => $receipt,
        ]);
    }

    /** Update status + payment_id after verification */
    public static function markPaid(
        string $orderId,
        string $paymentId,
        string $status = 'paid'
    ): bool {
        $pdo = getDBConnection();
        $sql = "UPDATE payments
                   SET payment_id = :payment_id,
                       status     = :status
                 WHERE order_id   = :order_id";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([
            ':payment_id' => $paymentId,
            ':status'     => $status,
            ':order_id'   => $orderId,
        ]);
    }
}
