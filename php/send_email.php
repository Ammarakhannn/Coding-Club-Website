<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

    $FName = $_POST['first_name'];
    // echo $FName;
    $LName = $_POST['last_name'];
    $Email = $_POST['email'];
    $Phnumber = $_POST['phone'];
    $Skills = $_POST['skills'];

        $mail = new PHPMailer(true);
        
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'ammarakhan797@gmail.com';
        $mail->Password = 'gartyomygxdtuvbk';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        
        $mail->setFrom('ammarakhan797@gmail.com', "Koderz Club");
        
        $mail->addAddress($Email);
        
        $mail->isHTML(true);
        $mail->Subject = 'Registration Confirmation';
        $mail->Body = "Dear " . $FName . " " . $LName . ",<br><br>"
        . "Thank you for registering with our website. We are excited to have you on board!<br><br>"
        . "Please find below the details you provided during registration:<br><br>"
        . "First Name: " . $FName . "<br>"
        . "Last Name: " . $LName . "<br>"
        . "Email: " . $Email . "<br>"
        . "Phone: " . $Phnumber . "<br>"
        . "Skills: " . $Skills . "<br><br>"
        . "We will notify you soon about your selection, and you can check the status on the website.<br><br>"
        . "Best regards,<br>"
        . "Koderz Club";
        
        $mail->send(); 

        echo 'success';
    
?>
