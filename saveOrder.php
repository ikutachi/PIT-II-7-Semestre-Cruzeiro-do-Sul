<?php

$orderData = json_decode(file_get_contents("php://input"), true);

if ($orderData) {
    $orderNumber = $orderData['orderNumber'];
    $items = $orderData['items'];
    $totalQuantity = $orderData['totalQuantity'];
    $totalPrice = $orderData['totalPrice'];

    $orderContent = "Pedido Nº: " . $orderNumber . "\n";
    $orderContent .= "Quantidade Total: " . $totalQuantity . "\n";
    $orderContent .= "Preço Final: " . $totalPrice . "\n";
    $orderContent .= "Items:\n";

    foreach ($items as $item) {
        if (!empty($item['name']) && !empty($item['price']) && !empty($item['quantity'])) {
            $orderContent .= "- Name: " . $item['name'] . ", Price: $" . $item['price'] . ", Quantity: " . $item['quantity'] . "\n";
        }
    }

    $dirPath = __DIR__ . '/orders';
    $filePath = $dirPath . '/' . $orderNumber . '.txt';

    if (!is_dir($dirPath)) {
        if (mkdir($dirPath, 0777, true)) {
            error_log("Created directory: $dirPath");
        } else {
            error_log("Failed to create directory: $dirPath");
            echo "Failed to create directory for saving orders.";
            exit;
        }
    }

    if (file_put_contents($filePath, $orderContent) !== false) {
        error_log("Order successfully saved to file: $filePath");
        echo "Order saved with order number: " . $orderNumber;
    } else {
        error_log("Failed to save order to file: $filePath");
        echo "Failed to save the order.";
    }
} else {
    error_log("No order data received.");
    echo "No order data received";
}
