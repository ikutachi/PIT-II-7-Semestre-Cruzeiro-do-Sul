<?php
$ordersDir = __DIR__ . '/orders';

$orderData = [];

if (is_dir($ordersDir)) {
  $files = array_filter(scandir($ordersDir), function ($file) {
    return preg_match('/^P\d{1,5}\.txt$/', $file);
  });

  foreach ($files as $file) {
    $filePath = $ordersDir . '/' . $file;
    $content = file_get_contents($filePath);

    $orderData[] = [
      'filename' => $file,
      'content' => $content
    ];
  }
}

header('Content-Type: application/json');
echo json_encode($orderData);
