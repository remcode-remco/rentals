<?php
    function checkFilePermissions($thisFile, $desiredPermissions) {
        $currentPermissions = fileperms($thisFile) & 0777;

        return $currentPermissions === $desiredPermissions;
    }

    $thisFile = 'upload.php';

    // Check file permissions for password_config.php
    $passwordConfigFile = 'password_config.php';
    if (!checkFilePermissions($passwordConfigFile, 0700)) {
        exit('Insufficient file permissions for password_config.php.');
    }

    // ============== set your password in password_config.php ==============
    include $passwordConfigFile;
    // ======================================================================

    $jsonInput = file_get_contents('php://input');
    $data = json_decode($jsonInput, true);

    // Check if only the password is provided
    if (isset($data['password']) && count($data) === 1) {
        $userPassword = $data['password'];

        if ($userPassword === $expectedPassword) {
            $response = ['status' => 'authenticated'];
        } else {
            $response = ['status' => 'authentication_failed'];
        }

        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    if ($userPassword !== $expectedPassword) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
        exit;
    }

    $thisFile = 'upload.php';

    if (!isset($data['editingSection'])) {
        exit('No editing section provided.');
    }

    switch ($data['editingSection']) {
        case 1:
            $filePath = 'navigation_nl.json';
            break;
        case 2:
            $filePath = 'hero_nl.json';
            break;
        case 3:
            $filePath = 'area_nl.json';
            break;
        case 4:
            $filePath = 'rentals_nl.json';
            break;
        case 5:
            $filePath = 'contact_nl.json';
            break;
        case 6:
            $filePath = 'footer_nl.json';
            break;
        default:
            $filePath = 'tmp_nl.json'; 
            break;
    }

    $jsonData = $data['jsonData'];

    if (file_put_contents($filePath, json_encode($jsonData, JSON_PRETTY_PRINT)) !== false) {
        echo json_encode(['status' => 'success', 'message' => 'Data saved successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error saving data to file']);
    }

?>
