<?php
    include 'password_config.php';

    $uploadDirectory = '/images/';

    if ($_FILES['compressedFile']['error'] === UPLOAD_ERR_OK) {
        $tempFile = $_FILES['compressedFile']['tmp_name'];
        $originalFileName = basename($_FILES['compressedFile']['name']);

        // Add the rentalIndex to the filename
        $rentalIndex = isset($_POST['rentalIndex']) ? $_POST['rentalIndex'] : '';
        $filename = $rentalIndex . '_' . $originalFileName;

        $destination = $uploadDirectory . $filename;

        if (isset($_POST['password']) && $_POST['password'] === $expectedPassword) {
            if (move_uploaded_file($tempFile, $destination)) {
                $response = ['status' => 'success', 'message' => 'File uploaded successfully'];
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
