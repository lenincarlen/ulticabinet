# Configuración de Correo Electrónico - Mejores Prácticas

## Desarrollo Local

El archivo `.env` contiene valores por defecto para desarrollo:

```env
MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=587
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

**Modo `log`**: Los correos se guardan en `storage/logs/laravel.log` en lugar de enviarse.

---

## Producción

### Opción 1: Variables de Entorno del Servidor (Recomendado)

Configura las variables en el servidor (no en el archivo `.env`):

**En servidor Linux/Apache:**
```bash
export MAIL_MAILER=smtp
export MAIL_HOST=smtp.gmail.com
export MAIL_PORT=587
export MAIL_ENCRYPTION=tls
export MAIL_USERNAME=tu-correo@gmail.com
export MAIL_PASSWORD=tu-contraseña-de-aplicacion
export MAIL_FROM_ADDRESS=tu-correo@gmail.com
export MAIL_FROM_NAME="Mi Empresa"
```

**En servidor con Forge/Vapor:**
Agregar las variables en el panel de control.

### Opción 2: Configuración desde la Interfaz Web (Actual)

1. Ir a **Configuración → Correo Electrónico**
2. Completar los datos del servidor SMTP
3. Guardar

La configuración se guarda en la base de datos y se carga dinámicamente en cada request.

**Ventajas:**
- ✅ No requiere acceso al servidor
- ✅ Cambios inmediatos sin reiniciar
- ✅ Configuración por entorno (dev/staging/prod)

**Consideraciones:**
- La configuración se cachea por 1 hora para rendimiento
- Al guardar, el caché se limpia automáticamente

---

## Cómo Funciona

1. **AppServiceProvider** carga la configuración al iniciar
2. **MailConfigService** lee desde base de datos (con caché)
3. Si no hay configuración en BD, usa valores del `.env`
4. La configuración se aplica en runtime usando `Config::set()`

---

## Comandos Útiles

```bash
# Limpiar caché de configuración
php artisan config:clear

# Ver configuración actual de correo
php artisan tinker
>>> config('mail')

# Probar envío de correo
php artisan tinker
>>> \Notification::route('mail', 'test@example.com')
    ->notify(new \App\Notifications\WelcomeUser('password123'));
```

---

## Seguridad en Producción

1. **Nunca** commitear el archivo `.env` al repositorio
2. Usar **contraseñas de aplicación** para Gmail (no la contraseña normal)
3. Considerar usar servicios como **Mailgun**, **SendGrid**, o **Amazon SES**
4. Rotar credenciales periódicamente

---

## Migración a Producción

**Paso 1**: Configurar variables de entorno en el servidor
**Paso 2**: O configurar desde la interfaz web
**Paso 3**: Verificar con comando de prueba
**Paso 4**: Activar notificaciones en la configuración
