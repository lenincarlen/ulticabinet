export interface User {
    id: number;
    name: string;
    email: string;
    staff_id?: string;
    is_active: boolean;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
    staff?: {
        id: string;
        name: string;
        email: string;
        role?: string;
    };
    roles?: Array<{
        id: number;
        name: string;
        display_name: string;
    }>;
}

export interface Staff {
    id: string;
    name: string;
    email: string;
    role?: string;
}

export interface Role {
    id: number;
    name: string;
    display_name: string;
    description?: string;
}

