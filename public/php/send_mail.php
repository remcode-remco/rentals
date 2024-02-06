<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Set the recipient email address
    $to = "remco@remcode.net";

    // Set the email subject
    $subject = "New message from $name";

    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Set the email headers
    $headers = "From: $name <$email>";

    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        // If the email is sent successfully, send a success response
        echo json_encode(["success" => true]);
    } else {
        // If there's an error sending the email, send an error response
        echo json_encode(["success" => false, "error" => "Failed to send email."]);
    }
} else {
    // If the form is not submitted, send an error response
    echo json_encode(["success" => false, "error" => "Form submission error."]);
}
?>
