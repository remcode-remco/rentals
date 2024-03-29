<?php
  include 'password_config.php';
  include 'security_check.php';

  $jsonInput = file_get_contents('php://input');
  $data = json_decode($jsonInput, true);

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      $password = isset($data['password']) ? $data['password'] : '';
      $filename = isset($data['filename']) ? $_SERVER['DOCUMENT_ROOT'] . '/' . $data['filename'] : '';
      if ($password === $expectedPassword) {
        error_log($filename);
          if (file_exists($filename)) {
              if (unlink($filename)) {
                  $response = ['status' => 'success', 'message' => 'File deleted successfully'];
              } else {
                  $response = ['status' => 'error', 'message' => 'Failed to delete file'];
              }
          } else {
              $response = ['status' => 'error', 'message' => 'File not found'];
          }
      } else {
          $response = ['status' => 'error', 'message' => 'Authentication failed'];
      }
  } else {
      $response = ['status' => 'error', 'message' => 'Invalid request method'];
  }

  header('Content-Type: application/json');
  echo json_encode($response);
?>
