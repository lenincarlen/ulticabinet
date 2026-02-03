<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Customer extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'customers';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name', // Mantener para compatibilidad
        'nombre',
        'apellido',
        'cedula',
        'phone', // Mantener para compatibilidad
        'telefono',
        'email',
        'address',
        'city',
        'country',
        'latitude',
        'longitude',
        'date_of_birth',
        'service_history',
        'created_by_id',
        // Campos fiscales NCF
        'rnc',
        'id_type',
        'business_name',
        // Campos CRM
        'status',
        'customer_lifetime_value',
        'segment',
        'category',
        'account_manager_id',
        'last_contact_date',
        'last_contact_type',
        'last_contact_notes',
        'next_action_date',
        'next_action_type',
        'next_action_notes',
        'notes',
        'preferred_channels',
        'social_media',
        'preferences',
        'marketing_consent',
        'marketing_consent_date',
        'satisfaction_score',
        'satisfaction_last_updated',
    ];

    /**
     * Accessor para obtener el nombre completo
     */
    public function getNombreCompletoAttribute(): string
    {
        $nombre = $this->nombre ?? $this->name ?? '';
        $apellido = $this->apellido ?? '';
        return trim("{$nombre} {$apellido}");
    }

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'service_history' => 'array',
        'date_of_birth' => 'date',
        'customer_lifetime_value' => 'decimal:2',
        'last_contact_date' => 'datetime',
        'next_action_date' => 'datetime',
        'notes' => 'array',
        'preferred_channels' => 'array',
        'social_media' => 'array',
        'preferences' => 'array',
        'marketing_consent' => 'boolean',
        'marketing_consent_date' => 'datetime',
        'satisfaction_last_updated' => 'datetime',
    ];

    

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function maintenanceSchedules()
    {
        return $this->hasMany(MaintenanceSchedule::class, 'customer_id');
    }

    public function workshopEquipments()
    {
        return $this->hasMany(WorkshopEquipment::class, 'customer_id');
    }

    // Commented out until Invoice and Quote models are created
    // public function invoices()
    // {
    //     return $this->hasMany(Invoice::class, 'customer_id');
    // }

    // public function quotes()
    // {
    //     return $this->hasMany(Quote::class, 'customer_id');
    // }

    /**
     * Responsable de cuenta (Account Manager) (REMOVED)
     */
    // public function accountManager()
    // {
    //    return $this->belongsTo(Staff::class, 'account_manager_id');
    // }

    // Commented out until Invoice model is created
    // public function calculateLifetimeValue(): float
    // {
    //     return $this->invoices()
    //         ->where('status', 'paid')
    //         ->sum('total') ?? 0;
    // }

   

    // Commented out until Invoice and Quote models are created
    // public function getTotalInvoicesAttribute(): int
    // {
    //     return $this->invoices()->count();
    // }

    // public function getTotalQuotesAttribute(): int
    // {
    //     return $this->quotes()->count();
    // }
}