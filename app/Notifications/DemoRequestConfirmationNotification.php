<?php

namespace App\Notifications;

use App\Models\DemoRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DemoRequestConfirmationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $demoRequest;

    /**
     * Create a new notification instance.
     */
    public function __construct(DemoRequest $demoRequest)
    {
        $this->demoRequest = $demoRequest;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Confirmación de Solicitud de Demo - ultiCabinet')
            ->greeting('¡Hola ' . $this->demoRequest->contact_name . '!')
            ->line('Gracias por tu interés en ultiCabinet. Hemos recibido tu solicitud de demostración.')
            ->line('')
            ->line('**Detalles de tu Solicitud:**')
            ->line('Número de Solicitud: ' . $this->demoRequest->request_number)
            ->line('Empresa: ' . $this->demoRequest->company_name)
            ->line('Solución: ' . $this->demoRequest->solution->name)
            ->line('')
            ->line('**¿Qué sigue?**')
            ->line('1. Recibirás un email de confirmación (este mensaje)')
            ->line('2. Un especialista se pondrá en contacto contigo en las próximas 24 horas')
            ->line('3. Te mostraremos cómo ' . $this->demoRequest->solution->name . ' puede ayudar a tu empresa')
            ->line('')
            ->line('Si tienes alguna pregunta, no dudes en contactarnos.')
            ->action('Ver Estado de Solicitud', url('/demo-gracias/' . $this->demoRequest->request_number))
            ->line('¡Esperamos poder mostrarte todo lo que ultiCabinet puede hacer por ti!')
            ->salutation('Saludos,')
            ->salutation('El equipo de ultiCabinet');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'demo_request_id' => $this->demoRequest->id,
            'request_number' => $this->demoRequest->request_number,
        ];
    }
}
