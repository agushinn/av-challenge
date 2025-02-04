<?php

namespace App\Services;

/**
 * Class AlertService
 *
 * This service handles the sending of alert emails.
 *
 * @package App\Services
 */
class AlertService
{
    public function __construct() {}

    /**
     * Sends job alert emails to a list of email addresses.
     *
     * @param array $emails List of email addresses to send the alert to.
     * @param string $jobTitle The title of the job.
     * @param string $jobLocation The location of the job.
     * @return void
     * @throws \Exception If sending an email fails.
     */
    public function sendJobAlertEmails($emails, $jobTitle, $jobLocation)
    {
        foreach ($emails as $email) {
            $subject = "New Job Alert: $jobTitle";
            $body = "A new job has been posted: $jobTitle in $jobLocation. Check it out!";
            $this->sendEmail($email, $subject, $body);
        }
    }

    /**
     * Sends an email.
     *
     * @param string $to The recipient email address.
     * @param string $subject The subject of the email.
     * @param string $body The body of the email.
     * @return void
     * @throws \Exception If sending the email fails.
     */
    private function sendEmail($to, $subject, $body)
    {
        $headers = "From: no-reply@example.com\r\n";
        $headers .= "Reply-To: no-reply@example.com\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        echo 'Sending email to ' . $to . PHP_EOL;
        if (!mail($to, $subject, $body, $headers)) {
            throw new \Exception('Failed to send email');
        }
        echo 'Email sent successfully' . PHP_EOL;
    }
}
