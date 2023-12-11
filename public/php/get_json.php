<?php
    //TMP remove when uploading ===============================================================================================
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    //========================================================================================================================
    header('Content-Type: application/json');

    $language = isset($_GET['language']) ? $_GET['language'] : 'en';

    $jsonDirectory = __DIR__ . '/../json';
    $jsonFilesDirectory = __DIR__ . '/../json/' . $language . '/';
    $imagesDirectory = __DIR__ . '/../images/';

    $fileNames = [
        'area',
        'contact',
        'hero',
        'navigation',
        'rentals',
    ];

    $fileContents = [];

    $imageFiles = scandir($imagesDirectory);

    foreach ($fileNames as $fileName) {
        $filePath = $jsonFilesDirectory . $fileName . '.json';

        // Extract the base filename without anything after and including '_' to add to the returned json
        $baseFileName = explode('_', $fileName)[0];

        if (file_exists($filePath)) {
            $jsonContent = file_get_contents($filePath);
            $decodedContent = json_decode($jsonContent, true);

            if ($baseFileName === 'rentals') {
                foreach ($imageFiles as $imageFile) {
                    // Check if the file starts with a number followed by an underscore
                    if (preg_match('/^(\d+)_/', $imageFile, $matches)) {
                        $index = intval($matches[1]);
                        $imageURL = ($index === 0) ? "https://picsum.photos/id/1018/1000/600/" : "{$imagesDirectory}{$imageFile}";

                        // Add the image details to the 'pictures' array for the respective rental index
                        $imageDetails = ['original' => "/images/{$imageFile}"];

                        $decodedContent['rentals'][$index]['pictures'][] = ['original' => "/images/{$imageFile}"];                    
                    }
                }
                if (isset($decodedContent['rentals']) && is_array($decodedContent['rentals'])) {
                    foreach ($decodedContent['rentals'] as $rentalIndex => $rental) {
                        if (isset($rental['videos'])) {
                            // Add videos to the 'pictures' array for each rental
                            foreach ($rental['videos'] as $video) {
                                $decodedContent['rentals'][$rentalIndex]['pictures'][] = $video;
                            }
                        }
                    }
                }
            }

            $fileContents[$baseFileName] = $decodedContent;
        } else {
            $fileContents[$baseFileName] = ['status' => 'error', 'message' => 'File not found'];
        }
    }

    // get contents from dates.json
    $filePath = $jsonDirectory . '/dates.json';
    $jsonContent = file_get_contents($filePath);
    $fileContents['dates'] = json_decode($jsonContent, true);
    // ==================

    // Scan /json for subdirectories and add directory names to array languages for frontend
    $entries = scandir($jsonDirectory);

    $subdirectories = array_filter($entries, function ($entry) use ($jsonDirectory) {
        return is_dir($jsonDirectory . '/' . $entry);
    });

    $fileContents['languages'] = array_values(array_diff($subdirectories, ['.', '..']));
    // ==================

    echo json_encode($fileContents, JSON_PRETTY_PRINT);
?>
