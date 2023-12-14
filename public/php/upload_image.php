<?php
//TMP remove when uploading ===============================================================================================
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    //========================================================================================================================
    
    include 'security_check.php';
    include 'password_config.php';

    $uploadDirectory = __DIR__ . '/../images/';

    if ($_FILES['compressedFile']['error'] === UPLOAD_ERR_OK) {
        $tempFile = $_FILES['compressedFile']['tmp_name'];
        $originalFileName = $_POST['filename'];
        // Add the rentalIndex to the filename
        $rentalIndex = isset($_POST['rentalIndex']) ? $_POST['rentalIndex'] : '';
        $filename = $rentalIndex . '_' . $originalFileName;

        $destination = $uploadDirectory . $filename;

        if (isset($_POST['password']) && $_POST['password'] === $expectedPassword) {
            if (move_uploaded_file($tempFile, $destination)) {
                $response = ['status' => 'success', 'message' => '/images/' . $filename];
            } else {
                $response = ['status' => 'error', 'message' => 'Failed to move file to destination'];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'Authentication failed'];
        }

    } else {
        $response = ['status' => 'error', 'message' => 'File upload failed'];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>
