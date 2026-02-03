export interface Customer {
    id: string;
    name?: string; // Compatibilidad
    nombre?: string;
    apellido?: string;
    cedula?: string;
    phone?: string; // Compatibilidad
    telefono?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    date_of_birth?: string;
    service_history?: any;
    created_by_id?: string;
    created_at?: string;
    updated_at?: string;
    nombre_completo?: string; // Accessor
    // Campos fiscales NCF
    rnc?: string;
    id_type?: string;
    business_name?: string;
    // Campos CRM
    status?: string; // active, inactive, potential, vip, etc.
    customer_lifetime_value?: number;
    segment?: string; // vip, regular, potential, etc.
    category?: string; // residential, commercial, corporate, etc.
    account_manager_id?: string;
    last_contact_date?: string;
    last_contact_type?: string; // phone, email, visit, etc.
    last_contact_notes?: string;
    next_action_date?: string;
    next_action_type?: string; // follow_up, quote, service, etc.
    next_action_notes?: string;
    notes?: string[] | Array<{ date: string; note: string; author?: string }>;
    preferred_channels?: string[]; // ['email', 'phone', 'whatsapp', 'sms']
    social_media?: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        tiktok?: string;
        youtube?: string;
    };
    preferences?: {
        language?: string;
        timezone?: string;
        [key: string]: any;
    };
    marketing_consent?: boolean;
    marketing_consent_date?: string;
    satisfaction_score?: number; // 1-10
    satisfaction_last_updated?: string;
    // Relaciones
    createdBy?: {
        id: string;
        name: string;
    };
    accountManager?: {
        id: string;
        name: string;
        email?: string;
    };
   
   
    quotes?: any[];
}
 

