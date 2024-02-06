<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $jsonInput = file_get_contents('php://input');
    $data = json_decode($jsonInput, true);
    error_log("Received data: " . print_r($data, true));
    
    $name = $data['name'];
    $email = $data['email'];
    $message = $data['message'];

    $to = "remco@remcode.net";

    $subject = "New message from $name";

    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    $headers = "From: $name <$email>";

    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to send email."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Form submission error."]);
}
?>
