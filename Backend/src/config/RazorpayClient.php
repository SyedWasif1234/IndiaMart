<?php
declare(strict_types=1);

namespace Config;

require_once __DIR__ . '/../utils/config.util.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use Razorpay\Api\Api;

final class RazorpayClient
{
    public static function create(): Api
    {
        return new Api(
            RAZORPAY_TEST_KEY_ID,
            RAZORPAY_TEST_KEY_SECRET
        );
    }
}
