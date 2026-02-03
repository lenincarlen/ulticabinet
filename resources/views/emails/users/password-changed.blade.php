<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contraseña Actualizada</title>
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
        .success-icon {
            text-align: center;
            font-size: 64px;
            margin: 20px 0;
        }
        .info-box {
            background-color: #f0fdf4;
            border: 2px solid #10b981;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .detail-row {
            padding: 10px 0;
            border-bottom: 1px solid #d1fae5;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            color: #065f46;
            font-weight: 600;
        }
        .detail-value {
            color: #047857;
            margin-top: 5px;
        }
        .warning-box {
            background-color: #fef2f2;
            border-left: 4px solid #ef4444;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .security-tips {
            background-color: #eff6ff;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        .tip {
            display: flex;
            align-items: start;
            margin: 10px 0;
        }
        .tip-icon {
            font-size: 20px;
            margin-right: 10px;
        }
        .button {
            display: inline-block;
            padding: 12px 28px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔐 Contraseña Actualizada</h1>
        </div>
        
        <div class="content">
            <div class="success-icon">✅</div>
            
            <p style="text-align: center; font-size: 18px; color: #374151;">
                <strong>Tu contraseña ha sido cambiada exitosamente</strong>
            </p>
            
            <div class="info-box">
                <div class="detail-row">
                    <div class="detail-label">👤 Usuario</div>
                    <div class="detail-value">{{ $user->email }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">📅 Fecha y Hora</div>
                    <div class="detail-value">{{ now()->format('d/m/Y H:i:s') }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">🌐 Dirección IP</div>
                    <div class="detail-value">{{ request()->ip() }}</div>
                </div>
            </div>
            
            <div class="warning-box">
                <strong>⚠️ ¿No fuiste tú?</strong><br>
                Si no realizaste este cambio, contacta inmediatamente al administrador del sistema. Tu cuenta podría estar comprometida.
            </div>
            
            <div class="security-tips">
                <h3 style="margin: 0 0 15px 0; color: #374151;">💡 Consejos de Seguridad</h3>
                
                <div class="tip">
                    <span class="tip-icon">🔒</span>
                    <span style="color: #6b7280; font-size: 14px;">
                        Usa una contraseña única que no utilices en otros sitios
                    </span>
                </div>
                
                <div class="tip">
                    <span class="tip-icon">🔤</span>
                    <span style="color: #6b7280; font-size: 14px;">
                        Combina letras mayúsculas, minúsculas, números y símbolos
                    </span>
                </div>
                
                <div class="tip">
                    <span class="tip-icon">📝</span>
                    <span style="color: #6b7280; font-size: 14px;">
                        Evita usar información personal fácil de adivinar
                    </span>
                </div>
                
                <div class="tip">
                    <span class="tip-icon">🔄</span>
                    <span style="color: #6b7280; font-size: 14px;">
                        Cambia tu contraseña periódicamente
                    </span>
                </div>
            </div>
            
            <center>
                <a href="{{ url('/login') }}" class="button">
                    Iniciar Sesión
                </a>
            </center>
            
            <p style="margin-top: 30px; color: #6b7280; font-size: 14px; text-align: center;">
                Gracias por mantener tu cuenta segura
            </p>
        </div>
        
        <div class="footer">
            <p><strong>{{ company_name() }}</strong></p>
            <p>Equipo de Seguridad</p>
            <p style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
                Este es un correo automático de seguridad. Por favor no responder.
            </p>
        </div>
    </div>
</body>
</html>
