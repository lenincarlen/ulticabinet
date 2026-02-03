<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido al Sistema</title>
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
            background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
            padding: 40px 20px;
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
        }
        .content {
            padding: 30px 20px;
        }
        .welcome-box {
            background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
            border: 2px solid #ec4899;
            border-radius: 8px;
            padding: 25px;
            margin: 20px 0;
            text-align: center;
        }
        .credentials-box {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        .credential-item {
            padding: 12px;
            margin: 10px 0;
            background-color: white;
            border-radius: 4px;
            border-left: 4px solid #ec4899;
        }
        .credential-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .credential-value {
            font-size: 18px;
            font-weight: 600;
            color: #374151;
            margin-top: 5px;
            word-break: break-all;
        }
        .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: 600;
            font-size: 16px;
        }
        .warning-box {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .steps {
            background-color: #f0f9ff;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        .step {
            display: flex;
            align-items: start;
            margin: 15px 0;
        }
        .step-number {
            background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            flex-shrink: 0;
            margin-right: 15px;
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
            <h1>🎉 ¡Bienvenido!</h1>
            <p>Tu cuenta ha sido creada exitosamente</p>
        </div>
        
        <div class="content">
            <div class="welcome-box">
                <h2 style="margin: 0 0 10px 0; color: #ec4899;">¡Hola!</h2>
                <p style="margin: 0; color: #6b7280;">
                    Se ha creado una cuenta para ti en <strong>{{ company_name() }}</strong>
                </p>
            </div>
            
            <p>A continuación encontrarás tus credenciales de acceso al sistema:</p>
            
            <div class="credentials-box">
                <div class="credential-item">
                    <div class="credential-label">📧 Correo Electrónico</div>
                    <div class="credential-value">{{ $user->email }}</div>
                </div>
                
                <div class="credential-item">
                    <div class="credential-label">🔑 Contraseña Temporal</div>
                    <div class="credential-value">{{ $temporaryPassword }}</div>
                </div>
            </div>
            
            <div class="warning-box">
                <strong>⚠️ Importante:</strong><br>
                Por seguridad, te recomendamos cambiar tu contraseña después de iniciar sesión por primera vez.
            </div>
            
            <div class="steps">
                <h3 style="margin: 0 0 20px 0; color: #374151;">Primeros Pasos</h3>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div>
                        <strong>Inicia Sesión</strong><br>
                        <span style="color: #6b7280; font-size: 14px;">
                            Usa tus credenciales para acceder al sistema
                        </span>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div>
                        <strong>Cambia tu Contraseña</strong><br>
                        <span style="color: #6b7280; font-size: 14px;">
                            Ve a tu perfil y actualiza tu contraseña
                        </span>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div>
                        <strong>Explora el Sistema</strong><br>
                        <span style="color: #6b7280; font-size: 14px;">
                            Familiarízate con las funcionalidades disponibles
                        </span>
                    </div>
                </div>
            </div>
            
            <center>
                <a href="{{ url('/login') }}" class="button">
                    🚀 Iniciar Sesión Ahora
                </a>
            </center>
            
            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar al administrador del sistema.
            </p>
        </div>
        
        <div class="footer">
            <p><strong>{{ company_name() }}</strong></p>
            <p>Sistema de Gestión Empresarial</p>
            <p style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
                Este correo contiene información confidencial. Si lo recibiste por error, por favor elimínalo.
            </p>
        </div>
    </div>
</body>
</html>
