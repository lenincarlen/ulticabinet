<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orden de Servicio Recibida</title>
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
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
        .success-box {
            background-color: #f0fdf4;
            border-left: 4px solid #10b981;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .info-card {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        .info-card h3 {
            margin: 0 0 15px 0;
            color: #374151;
            font-size: 16px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
            color: #374151;
        }
        .info-value {
            color: #6b7280;
            text-align: right;
        }
        .order-number {
            font-size: 28px;
            font-weight: 700;
            color: #10b981;
            text-align: center;
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
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>✅ Orden Recibida</h1>
        </div>
        
        <div class="content">
            <p>Estimado/a <strong>{{ $order->customer->name ?? $order->customer_name }}</strong>,</p>
            
            <div class="success-box">
                <strong>¡Gracias por confiar en nosotros!</strong><br>
                Hemos recibido tu solicitud de servicio y será procesada a la brevedad posible.
            </div>
            
            <div class="order-number">
                # {{ $order->service_order_number }}
            </div>
            
            <div class="info-card">
                <h3>📋 Detalles de tu Orden</h3>
                <div class="info-row">
                    <span class="info-label">Electrodoméstico:</span>
                    <span class="info-value">{{ $order->appliance_type }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Problema Reportado:</span>
                    <span class="info-value">{{ Str::limit($order->issue_description, 50) }}</span>
                </div>
                @if($order->desired_date)
                <div class="info-row">
                    <span class="info-label">Fecha Solicitada:</span>
                    <span class="info-value">{{ \Carbon\Carbon::parse($order->desired_date)->format('d/m/Y') }}</span>
                </div>
                @endif
                <div class="info-row">
                    <span class="info-label">Fecha de Registro:</span>
                    <span class="info-value">{{ $order->created_at->format('d/m/Y H:i') }}</span>
                </div>
            </div>
            
            <h3 style="color: #374151; margin-top: 30px;">¿Qué sigue?</h3>
            <ol style="color: #6b7280; padding-left: 20px;">
                <li>Nuestro equipo revisará tu solicitud</li>
                <li>Te contactaremos para confirmar la fecha y hora de la visita</li>
                <li>Un técnico especializado atenderá tu servicio</li>
                <li>Recibirás una factura al completar el servicio</li>
            </ol>
            
            <p style="margin-top: 30px; padding: 15px; background-color: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 4px;">
                <strong>📞 ¿Necesitas ayuda?</strong><br>
                Contáctanos al <strong>{{ config('app.phone', '(809) 000-0000') }}</strong>
            </p>
        </div>
        
        <div class="footer">
            <p><strong>{{ company_name() }}</strong></p>
            <p>Gracias por tu preferencia</p>
            <p style="font-size: 12px; color: #9ca3af;">
                Este es un correo automático, por favor no responder.
            </p>
        </div>
    </div>
</body>
</html>
