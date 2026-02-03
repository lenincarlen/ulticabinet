import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    siteSettings: Record<string, string>;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    roles?: string[]; // Array of role names (admin, operador, vendedor, tecnico)
    [key: string]: unknown; // This allows for additional properties...
}

export interface ActionLog {
    id: string;
    action: string;
    timestamp: Date;
    user?: Staff;
    details?: string;

}

export interface AppState {
    id: number;


    lastQuoteNumber: number;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    email?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    createdById?: string;
    invoices?: any[];
    quotes?: any[];
    [key: string]: unknown; // Allow additional properties
}


export interface Staff {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
}
