<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class UserInvitationNotification extends Notification
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
            ->subject('You have been invited to EAPC')
            ->greeting("Hello {$notifiable->first_name},")
            ->line("An account has been created for you on the Enforcement & Parking Corrector System as a {$notifiable->role}.")
            ->line("Your username is: {$notifiable->username}")
            ->line('Click below to set your password and finish setting up your account.')
            ->action('Accept Invitation & Set Password', $url)
            ->line('This invitation link will expire in 3 days.')
            ->line('If you were not expecting this invitation, you can safely ignore this email.');
    }
}
