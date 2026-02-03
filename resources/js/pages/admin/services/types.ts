export interface Service {
    id: string;
    name: string;
    description?: string;
    base_price?: number;
    is_active: boolean;
    icon?: string;
    display_order: number;
    created_at: string;
    updated_at: string;
}
