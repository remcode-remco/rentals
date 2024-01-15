<?php
    //TMP remove when uploading ===============================================================================================
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    //========================================================================================================================

  include 'password_config.php';
  include 'security_check.php';

  $jsonInput = file_get_contents('php://input');
  $data = json_decode($jsonInput, true);

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      // Assuming you receive the password and filename via POST
      $password = isset($data['password']) ? $data['password'] : '';
      $filename = isset($data['filename']) ? $_SERVER['DOCUMENT_ROOT'] . '/' . $data['filename'] : '';
      // Perform password check
      if ($password === $expectedPassword) {
        error_log($filename);
          if (file_exists($filename)) {
              // Attempt to delete the file
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
