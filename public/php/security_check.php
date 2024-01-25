<?php
    function checkFilePermissions($thisFile, $desiredPermissions) {
        $currentPermissions = fileperms($thisFile) & 0777;

        return $currentPermissions === $desiredPermissions;
    }

    // $thisFile = 'upload.php';

    // Check file permissions for password_config.php
    $passwordConfigFile = 'password_config.php';
    if (!checkFilePermissions($passwordConfigFile, 0700)) {
        exit('Insufficient file permissions for password_config.php.');
    }
?>