<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva Orden de Servicio</title>
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
        .alert-box {
            background-color: #f0f9ff;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .info-table {
            width: 100%;
            margin: 20px 0;
            border-collapse: collapse;
        }
        .info-table td {
            padding: 10px;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-table td:first-child {
            font-weight: 600;
            color: #374151;
            width: 40%;
        }
        .info-table td:last-child {
            color: #6b7280;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: 600;
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
            <h1>🔔 Nueva Orden de Servicio</h1>
        </div>
        
        <div class="content">
            <p>Hola Administrador,</p>
            
            <div class="alert-box">
                <strong>Se ha registrado una nueva orden de servicio en el sistema.</strong>
            </div>
            
            <table class="info-table">
                <tr>
                    <td>Número de Orden:</td>
                    <td><strong>{{ $order->service_order_number }}</strong></td>
                </tr>
                <tr>
                    <td>Cliente:</td>
                    <td>{{ $order->customer->name ?? $order->customer_name }}</td>
                </tr>
                <tr>
                    <td>Teléfono:</td>
                    <td>{{ $order->customer_phone }}</td>
                </tr>
                @if($order->customer_email)
                <tr>
                    <td>Correo:</td>
                    <td>{{ $order->customer_email }}</td>
                </tr>
                @endif
                <tr>
                    <td>Tipo de Electrodoméstico:</td>
                    <td>{{ $order->appliance_type }}</td>
                </tr>
                <tr>
                    <td>Descripción del Problema:</td>
                    <td>{{ $order->issue_description }}</td>
                </tr>
                @if($order->desired_date)
                <tr>
                    <td>Fecha Deseada:</td>
                    <td>{{ \Carbon\Carbon::parse($order->desired_date)->format('d/m/Y') }}</td>
                </tr>
                @endif
                @if($order->desired_time)
                <tr>
                    <td>Hora Deseada:</td>
                    <td>{{ $order->desired_time }}</td>
                </tr>
                @endif
                <tr>
                    <td>Fecha de Creación:</td>
                    <td>{{ $order->created_at->format('d/m/Y H:i') }}</td>
                </tr>
            </table>
            
            <center>
                <a href="{{ url('/service-orders/' . $order->id) }}" class="button">
                    Ver Orden Completa
                </a>
            </center>
            
            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                Esta orden requiere tu atención para asignar un técnico y programar la visita.
            </p>
        </div>
        
        <div class="footer">
            <p><strong>{{ company_name() }}</strong></p>
            <p>Sistema de Gestión de Órdenes de Servicio</p>
            <p style="font-size: 12px; color: #9ca3af;">
                Este es un correo automático, por favor no responder.
            </p>
        </div>
    </div>
</body>
</html>
