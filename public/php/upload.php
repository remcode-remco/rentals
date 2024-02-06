<?php

    include 'security_check.php';

    // ============== set your password in password_config.php ==============
    include $passwordConfigFile;
    // ======================================================================

    $jsonInput = file_get_contents('php://input');
    $data = json_decode($jsonInput, true);

    // Check if only the password is provided to mock a logged in session for frontend
    if (isset($data['password']) && count($data) === 1) {
        if ($data['password'] === $expectedPassword) {
            $response = ['status' => 'authenticated'];
        } else {
            $response = ['status' => 'authentication_failed'];
        }

        echo json_encode($response);
        exit;
    }

    if ($data['password'] !== $expectedPassword) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
        exit;
    }

    if (!isset($data['editingSection'])) {
        exit('No editing section provided.');
    }

    switch ($data['editingSection']) {
        case 1:
            $fileName = 'navigation.json';
            break;
        case 2:
            $fileName = 'hero.json';
            break;
        case 3:
            $fileName = 'area.json';
            break;
        case 4:
            $fileName = 'rentals.json';
            break;
        case 5:
            $fileName = 'contact.json';
            break;
        case 6:
            $fileName = 'footer.json';
            break;
        default:
            $fileName = 'tmp_nl.json'; 
            break;
    }

    $jsonData = $data['jsonData'];
    $filePath = __DIR__ . '/../json/' . $data['language'] . '/' . $fileName;

    if (file_put_contents($filePath, json_encode($jsonData, JSON_PRETTY_PRINT)) !== false) {
        echo json_encode(['status' => 'success', 'message' => 'Data saved successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error saving data to file']);
    }

?>
