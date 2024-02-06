<?php
    include 'security_check.php';
    include 'password_config.php';

    $uploadDirectory = $_SERVER['DOCUMENT_ROOT'] . '/images/';

    if ($_FILES['compressedFile']['error'] === UPLOAD_ERR_OK) {
        $tempFile = $_FILES['compressedFile']['tmp_name'];
        $originalFileName = $_POST['filename'];

        if (isset($_POST['section'])) {        
            if ($_POST['section'] === "1") {
                // Section 1 is hero section
                unlink($_SERVER['DOCUMENT_ROOT'] . '/images/hero.jpg');
                $filename = "hero.jpg";
            } elseif ($_POST['section'] === "2") {
                // Section 2 is area: add "area_" to the beginning of the original filename
                $filename = "area_" . $originalFileName;
            } elseif ($_POST['section'] === "3") {
                //Section 3 is rentals: add rentalIndex to the filename
                $rentalIndex = isset($_POST['rentalIndex']) ? $_POST['rentalIndex'] : '';
                $filename = $rentalIndex . '_' . $originalFileName;
            } elseif ($_POST['section'] === "4") {
                // Section 4 is owner image
                unlink($_SERVER['DOCUMENT_ROOT'] . '/images/owner_img.jpg');
                $filename = "owner_img.jpg";
            } else {
                // When section is not set
                $filename = "default_" . $originalFileName;
            }
        } else {
            // When section is not set
            $filename = "default_" . $originalFileName;
        }

        $destination = $uploadDirectory . $filename;

        error_log($destination);
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
