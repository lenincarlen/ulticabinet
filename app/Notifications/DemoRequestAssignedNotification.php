<?php

namespace App\Notifications;

use App\Models\DemoRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DemoRequestAssignedNotification extends Notification implements ShouldQueue
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
        $scheduledInfo = '';
        if ($this->demoRequest->scheduled_at) {
            $scheduledInfo = 'Fecha Agendada: ' . date('d/m/Y H:i', strtotime($this->demoRequest->scheduled_at));
        }

        return (new MailMessage)
            ->subject('Demo Asignado - ' . $this->demoRequest->company_name)
            ->greeting('¡Hola ' . $notifiable->name . '!')
            ->line('Se te ha asignado una nueva demostración.')
            ->line('')
            ->line('**Detalles del Cliente:**')
            ->line('Empresa: ' . $this->demoRequest->company_name)
            ->line('Contacto: ' . $this->demoRequest->contact_name)
            ->line('Email: ' . $this->demoRequest->contact_email)
            ->line('Teléfono: ' . $this->demoRequest->contact_phone)
            ->line('')
            ->line('**Solución:**')
            ->line($this->demoRequest->solution->name)
            ->line('')
            ->when($scheduledInfo, function ($mail) use ($scheduledInfo) {
                return $mail->line($scheduledInfo)->line('');
            })
            ->line('**Preferencias del Cliente:**')
            ->line('Fecha Preferida: ' . ($this->demoRequest->preferred_date ? date('d/m/Y', strtotime($this->demoRequest->preferred_date)) : 'No especificada'))
            ->line('Horario: ' . ($this->demoRequest->preferred_time ? ucfirst($this->demoRequest->preferred_time) : 'No especificado'))
            ->line('Formato: ' . ($this->demoRequest->demo_format ? ucfirst($this->demoRequest->demo_format) : 'No especificado'))
            ->action('Ver Detalles Completos', url('/admin/demo-requests/' . $this->demoRequest->id))
            ->line('Por favor, contacta al cliente para coordinar los detalles del demo.');
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
