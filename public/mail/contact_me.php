<?php

$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
// Put your email id here. RSVP form will be sent to this email id.
$to = 'YOUR-NAME@DOMAIN-NAME.com'; 

$email_subject = "Website Contact Form:  $name";

// Create email body
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message";

// Replace with email id you want the message to be from
$headers = "From: no-reply@DOMAIN-NAME.com\n";

$headers .= "Reply-To: $email_address";	

if (mail($to,$email_subject,$email_body,$headers)) {
	echo 'success';
} else {
	echo "fail";
}

?>