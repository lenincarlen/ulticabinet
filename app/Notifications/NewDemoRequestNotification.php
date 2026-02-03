<?php

namespace App\Notifications;

use App\Models\DemoRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewDemoRequestNotification extends Notification implements ShouldQueue
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
            ->subject('Nueva Solicitud de Demo - ' . $this->demoRequest->company_name)
            ->greeting('¡Nueva Solicitud de Demo!')
            ->line('Se ha recibido una nueva solicitud de demostración.')
            ->line('')
            ->line('**Detalles de la Solicitud:**')
            ->line('Número de Solicitud: ' . $this->demoRequest->request_number)
            ->line('Empresa: ' . $this->demoRequest->company_name)
            ->line('Contacto: ' . $this->demoRequest->contact_name)
            ->line('Email: ' . $this->demoRequest->contact_email)
            ->line('Teléfono: ' . $this->demoRequest->contact_phone)
            ->line('Solución: ' . $this->demoRequest->solution->name)
            ->line('')
            ->line('Fecha Preferida: ' . ($this->demoRequest->preferred_date ? date('d/m/Y', strtotime($this->demoRequest->preferred_date)) : 'No especificada'))
            ->line('Horario: ' . ($this->demoRequest->preferred_time ? ucfirst($this->demoRequest->preferred_time) : 'No especificado'))
            ->action('Ver Solicitud', url('/admin/demo-requests/' . $this->demoRequest->id))
            ->line('Por favor, contacta al cliente lo antes posible para coordinar el demo.');
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
            'company_name' => $this->demoRequest->company_name,
        ];
    }
}
