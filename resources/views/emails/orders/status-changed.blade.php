<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualización de Orden</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px 20px;
        }
        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
            margin: 10px 0;
        }
        .status-pending { background-color: #fef3c7; color: #92400e; }
        .status-scheduled { background-color: #dbeafe; color: #1e40af; }
        .status-in_progress { background-color: #fef3c7; color: #92400e; }
        .status-completed { background-color: #d1fae5; color: #065f46; }
        .status-cancelled { background-color: #fee2e2; color: #991b1b; }
        .status-change {
            background-color: #f0f9ff;
            border: 2px solid #3b82f6;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .arrow {
            font-size: 24px;
            color: #3b82f6;
            margin: 0 10px;
        }
        .info-box {
            background-color: #f9fafb;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>📢 Actualización de tu Orden</h1>
        </div>
        
        <div class="content">
            <p>Estimado/a <strong>{{ $order->customer->name ?? $order->customer_name }}</strong>,</p>
            
            <p>Te informamos que el estado de tu orden de servicio ha sido actualizado.</p>
            
            <div class="info-box">
                <strong>Número de Orden:</strong> {{ $order->service_order_number }}<br>
                <strong>Electrodoméstico:</strong> {{ $order->appliance_type }}
            </div>
            
            <div class="status-change">
                <p style="margin: 0 0 15px 0; color: #6b7280;">Cambio de Estado</p>
                <div>
                    @php
                        $statusLabels = [
                            'pending' => 'Pendiente',
                            'tecnico_asignado' => 'Técnico Asignado',
                            'scheduled' => 'Programada',
                            'in_progress' => 'En Progreso',
                            'completed' => 'Completada',
                            'pending_billing' => 'Pendiente de Facturación',
                            'closed' => 'Cerrada',
                            'cancelled' => 'Cancelada',
                        ];
                        $oldLabel = $statusLabels[$oldStatus] ?? $oldStatus;
                        $newLabel = $statusLabels[$order->status] ?? $order->status;
                    @endphp
                    
                    <span class="status-badge status-{{ $oldStatus }}">{{ $oldLabel }}</span>
                    <span class="arrow">→</span>
                    <span class="status-badge status-{{ $order->status }}">{{ $newLabel }}</span>
                </div>
            </div>
            
            @if($order->status === 'tecnico_asignado' && $order->assignedTo)
            <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <strong>✅ Técnico Asignado</strong><br>
                {{ $order->assignedTo->name }}<br>
                @if($order->assignedTo->personal_phone)
                    📞 {{ $order->assignedTo->personal_phone }}
                @endif
            </div>
            @endif
            
            @if($order->status === 'scheduled' && $order->scheduled_date)
            <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <strong>📅 Visita Programada</strong><br>
                Fecha: {{ \Carbon\Carbon::parse($order->scheduled_date)->format('d/m/Y') }}<br>
                @if($order->scheduled_time)
                    Hora: {{ $order->scheduled_time }}
                @endif
            </div>
            @endif
            
            @if($order->status === 'completed')
            <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <strong>🎉 Servicio Completado</strong><br>
                Pronto recibirás tu factura. ¡Gracias por tu preferencia!
            </div>
            @endif
            
            @if($order->status === 'cancelled')
            <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <strong>❌ Orden Cancelada</strong><br>
                Si tienes alguna pregunta, no dudes en contactarnos.
            </div>
            @endif
            
            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                Si tienes alguna pregunta sobre tu orden, contáctanos al <strong>{{ config('app.phone', '(809) 000-0000') }}</strong>
            </p>
        </div>
        
        <div class="footer">
            <p><strong>{{ company_name() }}</strong></p>
            <p>Manteniéndote informado en cada paso</p>
        </div>
    </div>
</body>
</html>
