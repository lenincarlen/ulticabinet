
export interface ServiceOrder {
    id: string;
    service_order_number: string;
    status: string;
    created_at: string;
    start?: string;
    desired_date?: string;
    desired_time?: string;
    completed_at?: string;

    // Customer info
    customer?: {
        id: number;
        name: string;
        email?: string;
        phone?: string;
        address?: string;
    };
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    customer_address?: string;
    latitude?: number;
    longitude?: number;

    // Service details
    appliance_type?: string;
    issue_description?: string;
    service_notes?: string | { description?: string; notes?: string };

    // History
    status_history?: StatusHistory[];
}

export interface StatusHistory {
    id: number;
    status: string;
    notes?: string;
    created_at: string;
    user?: {
        name: string;
    };
}
