<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class PasswordResetLinkNotification extends Notification
{
    public function __construct(private readonly string $token)
    {
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        $url = url('/invitation/'.$this->token);

        return (new MailMessage)
            ->subject('Reset your EAPC password')
            ->greeting("Hello {$notifiable->first_name},")
            ->line('An admin or supervisor has requested a password reset for your Enforcement & Parking Corrector System account.')
            ->line("Your username is: {$notifiable->username}")
            ->line('Click below to set a new password.')
            ->action('Reset Password', $url)
            ->line('This link will expire in 3 days.')
            ->line('If you were not expecting this, you can safely ignore this email — your current password will keep working.');
    }
}
