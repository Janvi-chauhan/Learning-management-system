<?php

namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class OtpMailService
{
    public static function sendOtp($email, $otp)
    {
        $mail = new PHPMailer(true);

        try {

            $mail->isSMTP();

            $mail->Host = env('MAIL_HOST');

            $mail->SMTPAuth = true;

            $mail->Username = env('MAIL_USERNAME');

            $mail->Password = env('MAIL_PASSWORD');

            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

            $mail->Port = env('MAIL_PORT');

            $mail->setFrom(
                env('MAIL_FROM_ADDRESS'),
                env('MAIL_FROM_NAME')
            );

            $mail->addAddress($email);

            $mail->isHTML(true);

            $mail->Subject = "Email Verification OTP";

            $mail->Body = "

                <h2>Creative Programming Classes</h2>

                <p>Your OTP is:</p>

                <h1>{$otp}</h1>

                <p>This OTP is valid for 10 minutes.</p>

            ";

            $mail->send();

            return true;

        } catch (Exception $e) {

            return false;
        }
    }
}